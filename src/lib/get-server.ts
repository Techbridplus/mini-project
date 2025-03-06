"use client"
import axios from "axios";
const FETCH_POSTS_LIMIT = 10;

export default async function getServer({
  pageParam = 1,
}: {
  pageParam: unknown;
}) {
  // const res = await axios.get("/api/server-fetch", {
  //   params: {
  //     page: pageParam,
  //     limit: FETCH_POSTS_LIMIT,
  //   },
  // });
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${FETCH_POSTS_LIMIT}`
  );
  return res.json();
}