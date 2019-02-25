import _Vue from 'vue';
import DynatraceInstance from './DynatraceInstance';

export const DynatracePlugin = (Vue: typeof _Vue) => {
  Vue.prototype.$dynatrace = new DynatraceInstance();
};
