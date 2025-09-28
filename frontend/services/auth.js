import api from "../lib/axios";

export async function signup(name, email, password) {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
}

export async function signin(email, password) {
  const { data } = await api.post("/auth/signin", { email, password });
  return data;
}