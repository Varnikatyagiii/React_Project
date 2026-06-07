import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api"
});

// Products
export const getProducts = () => API.get("/products");
export const addProduct = (data) => API.post("/products", data);

// Farmers
export const getFarmers = () => API.get("/farmers");

// Orders
export const getOrders = () => API.get("/orders");
export const createOrder = (data) => API.post("/orders", data);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);

// Cart
export const getCart = (userId) => API.get(`/cart/${userId}`);
export const addToCart = (data) => API.post("/cart", data);
export const removeFromCart = (data) => API.delete("/cart/remove", { data });
export const clearCart = (userId) => API.delete(`/cart/clear/${userId}`);

// Auth
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

// Contact
export const sendMessage = (data) => API.post("/contact", data);