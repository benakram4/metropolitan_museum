import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  const router = useRouter();

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    const searchField = e.target.search.value;
    if (searchField !== "") {
      e.target.search.value = "";
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));

      router.push(`/artwork?title=true&q=${searchField}`);

      setIsExpanded(false);
    } else {
      document.querySelector(".search-field").classList.add("disabled");
    }
  };

  const onToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onNavLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="navbar-custom navbar-dark fixed-top"
      >
        <Container className="fluid navbar-container">
          <Navbar.Brand>🎨 Metropolitan Museum</Navbar.Brand>
          <Navbar.Toggle
            onClick={onToggleExpand}
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-1" navbarScroll>
              <Link href="/" legacyBehavior passHref>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={onNavLinkClick}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" legacyBehavior passHref>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={onNavLinkClick}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={searchSubmit}>
                <Form.Control
                  type="search"
                  name="search"
                  placeholder="Search"
                  className="me-2 search-field"
                  aria-label="Search"
                />
                <Button type="submit" id="btn">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token ? (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" legacyBehavior passHref>
                    <NavDropdown.Item onClick={onNavLinkClick}>
                      Favourite
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" legacyBehavior passHref>
                    <NavDropdown.Item onClick={onNavLinkClick}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/login" legacyBehavior passHref>
                    <NavDropdown.Item onClick={logout}>
                      Log out
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              ) : (
                <>
                  <Link href="/register" legacyBehavior passHref>
                    <Nav.Link
                      active={router.pathname === "/register"}
                      onClick={onNavLinkClick}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" legacyBehavior passHref>
                    <Nav.Link
                      active={router.pathname === "/login"}
                      onClick={onNavLinkClick}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
