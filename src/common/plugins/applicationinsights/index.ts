import _Vue from 'vue';
import ApplicationInsightsInstance from './ApplicationInsightsInstance';

export const ApplicationInsightsPlugin = (Vue: typeof _Vue) => {
  Vue.prototype.$applicationInsights = new ApplicationInsightsInstance();
};
