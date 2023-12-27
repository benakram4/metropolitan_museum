import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

async function makeRequest(method, path, body) {
  const TOKEN = getToken();
  const headers = {
    Authorization: `JWT ${TOKEN}`,
    "Content-Type": "application/json",
  };
  const url = `${API_URL}/${path}`;

  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function addToFavorites(id) {
  return makeRequest(Method.PUT, `favorites/${id}`);
}

export async function removeFromFavorites(id) {
  return makeRequest(Method.DELETE, `favorites/${id}`);
}

export async function getFavorites() {
  return makeRequest(Method.GET, "favorites");
}

export async function addToHistory(id) {
  return makeRequest(Method.PUT, `history/${id}`);
}

export async function removeFromHistory(id) {
  return makeRequest(Method.DELETE, `history/${id}`);
}

export async function getHistory() {
  return makeRequest(Method.GET, "history");
}
