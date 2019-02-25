import _Vue from 'vue';
import AnalyticsInstance from './AnalyticsInstance';
import Router from 'vue-router';

export const AnalyticsPlugin = (Vue: typeof _Vue, router: Router) => {
  Vue.prototype.$analytics = new AnalyticsInstance(router);
};
