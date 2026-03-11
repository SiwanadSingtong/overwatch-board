import apiClient from "@/lib/axios";

const HEROES_ENDPOINT = "/heroes";

/**
 * Fetch all heroes
 * @param {{ role?: "damage" | "support" | "tank" }} params
 * @returns {Promise<Array>}
 */
export const getHeroes = (params = {}) => {
  return apiClient.get(HEROES_ENDPOINT, { params });
};

/**
 * Fetch a single hero by key (e.g. "ana", "tracer")
 * @param {string} heroKey
 * @returns {Promise<Object>}
 */
export const getHeroByKey = (heroKey) => {
  return apiClient.get(`${HEROES_ENDPOINT}/${heroKey}`);
};

/**
 * Fetch hero stats (competitive PC Asia leaderboard)
 * @returns {Promise<Array<{hero: string, pickrate: number, winrate: number}>>}
 */
export const getHeroStats = () => {
  return apiClient.get(`${HEROES_ENDPOINT}/stats`, {
    params: { platform: "pc", gamemode: "competitive", region: "americas" },
  });
};
