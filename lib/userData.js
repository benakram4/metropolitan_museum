import { getToken } from "./authenticate"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

async function makeRequest(method, path, body) {
    const TOKEN = getToken();
    const headers = {
        "Authorization": `JWT ${TOKEN}`,
        "Content-Type": "application/json"
    };
    const url = `${API_URL}/${path}`;

    const res = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
    });

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function addToFavourites(id) {
    return makeRequest(Method.PUT, `user/favourites/${id}`)
}

export async function removeFromFavourites(id) {
    return makeRequest(Method.DELETE, `user/favourites/${id}`);
}

export async function getFavourites() {
    return makeRequest(Method.GET, "user/favourites");
}

export async function addToHistory(id) {
    return makeRequest(Method.PUT, `user/history/${id}`);
}

export async function removeFromHistory(id) {
    return makeRequest(Method.DELETE, `user/history/${id}`);
}

export async function getHistory() {
    return makeRequest(Method.DELETE, "user/history");
}

