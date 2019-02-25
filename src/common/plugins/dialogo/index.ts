import _Vue from 'vue';
import DialogoInstance from './DialogoInstance';

export const DialogoPlugin = (Vue: typeof _Vue) => {
  Vue.prototype.$dialogo = new DialogoInstance();
};
