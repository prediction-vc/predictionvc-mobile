import { post, get } from './request';
import { PROJECT_TOKEN_INFO, USER_TOKEN_NEWS } from './preferences';

export const Prediction = {

  async getProjectTokenInformation(body) {
    return post('project/token/info', { body, store: PROJECT_TOKEN_INFO });
  },

  async getProject(project) {
    return get(`project/${project}`, { });
  },

  async getNews() {
    return post('user/tokens/news', { authorize: true, store: USER_TOKEN_NEWS });
  },

  async updateTokenToPortfolio(body) {
    return post('project/token/add', { body, authorize: true });
  },

  async followProject(body) {
    return post('project/like', { body, authorize: true });
  },

  async unFollowProject(body) {
    return post('project/unlike', { body, authorize: true });
  },

  async getOpinionsFromProjectId(projectId) {
    return post(`opinions/${projectId}`, { body: {projectId}, authorize: true });
  },

  async getProjectData(projectId) {
    return post(`files/projects/${projectId}`, { body: {projectId}, authorize: true });
  },

  async importExchangeTokens(body) {
    return post('account/import', { body, authorize: true });
  },

  async addExchangePortfolio(body) {
    return post('account/portfolio/exchange', {  body, authorize: true });
  },

  async removeExchangePortfolio(body) {
    return post('account/portfolio/remove', {  body, authorize: true });
  }
};
