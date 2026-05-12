import api from "./api";

export const getProducts = (params) => {
  return api.get("/products", { params });
};

export const createProduct = (data, token) => {
  return api.post("/products", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};