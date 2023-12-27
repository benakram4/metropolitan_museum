import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../lib/authenticate";
import { useAtom } from "jotai";
import { favoritesAtom, searchHistoryAtom } from "@/store";
import { getFavorites, getHistory } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavorites(await getFavorites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    updateAtoms();
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
}
