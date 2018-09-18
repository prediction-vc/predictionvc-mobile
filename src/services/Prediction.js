import { post, get } from './request';
import { NEWS_SOURCES, Preferences, PROJECT_TOKEN_INFO, USER_TOKEN_NEWS } from './preferences'

export const Prediction = {

  async getProjectTokenInformation(body) {
    return post('project/token/info', { body, store: PROJECT_TOKEN_INFO });
  },

  async getProject(project) {
    return get(`project/${project}`, { });
  },

  async getNews(sources) {
    return post('news', { body: {sources: sources}, authorize: false, store: USER_TOKEN_NEWS });
  },

  // TODO: Eventually we'll get this from the server, so just change the implementation of the method, calls should remain the same
  async getNewsSources () {
    let newsSources = await Preferences.getItem(NEWS_SOURCES)
    if (newsSources && newsSources.length > 0) {
      return newsSources
    }
    return [
      {name: 'coindesk.com', active: true},
      {name: 'ccn.com', active: true},
      {name: 'bitcoin.com', active: true},
      {name: 'cointelegraph.com', active: true},
      {name: 'bitcoinist.com', active: true},
      {name: 'cryptovest.com', active: true}
    ];
  },

  setNewsSources(newsSources) {
    Preferences.setItem(NEWS_SOURCES, newsSources)
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
