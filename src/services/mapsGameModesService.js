import apiClient from "@/lib/axios";

export const getGameModes = () => apiClient.get("/gamemodes");

export const getMaps = (params = {}) => apiClient.get("/maps", { params });
