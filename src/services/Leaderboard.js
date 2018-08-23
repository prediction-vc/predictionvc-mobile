import { get } from './request';

export const Leaderboard = {

  async getTrading(days) {
    return get(`leaderboard/performance?q=${days}`, { });
  },

  async getContribution(days) {
    return get(`leaderboard/totalcontribution?q=${days}`, { });
  },

};