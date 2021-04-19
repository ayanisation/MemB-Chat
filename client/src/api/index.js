import axios from "axios";

const API = axios.create({
  baseURL: "https://memb-chat-server.herokuapp.com",
});

export const findUser = (user) => API.post("/auth/signin", user);
export const addUser = (newUser) => API.post("/auth/signup", newUser);
export const fetchUsers = () => API.get("/auth");

export const findChat = (participants) =>
  API.post("/chat/findChat", participants);
export const userChats = (username) => API.get(`/chat/${username}/userChats`);
export const newMessage = (id, message) =>
  API.patch(`/chat/${id}/newMessage`, message);
export const deleteMessage = (id, messageId) =>
  API.patch(`/chat/${id}/deleteMessage`, { messageId: messageId });
export const deleteForMe = (id, messageId) =>
  API.patch(`/chat/${id}/deleteForMe`, { messageId: messageId });
export const messageSeen = (id, user) =>
  API.patch(`/chat/${id}/messageSeen`, { user });
