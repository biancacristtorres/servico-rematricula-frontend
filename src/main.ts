// tslint:disable
import Vue from "vue";
import Vuetify from "vuetify";
import VeeValidate, { Validator } from "vee-validate";
import { DialogoPlugin } from "./common/plugins/dialogo";
import { AnalyticsPlugin } from "./common/plugins/analytics";
import { ApplicationInsightsPlugin } from "./common/plugins/applicationinsights";
import { DynatracePlugin } from "./common/plugins/dynatrace";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import moment from "moment";
import pt from "vuetify/src/locale/pt";
import { FeatureTogglePlugin } from "componente-frontend-core/plugins/FeatureToggle";

import "vuetify/dist/vuetify.min.css";
import "moment/locale/pt-br";
import "./registerRouteConfig";
import '@mdi/font/css/materialdesignicons.css';

const vuetifyColors = require("vuetify/es5/util/colors").default;

const validatorPt = require("vee-validate/dist/locale/pt_BR").default;

const vuetifyOptions = {
  lang: {
    locales: { pt },
    current: "pt"
  },
  theme: {
    primary: vuetifyColors.teal.lighten2,
    secondary: vuetifyColors.blue.accent2
  },
  iconfont: 'mdi',
};

const vueOptions = {
  router,
  store,
  render: (h: any) => h(App)
};

Vue.use(Vuetify, vuetifyOptions);
Vue.use(VeeValidate);
Vue.use(DialogoPlugin);
Vue.use(FeatureTogglePlugin, store);
Vue.use(AnalyticsPlugin, router);
Vue.use(ApplicationInsightsPlugin);
Vue.use(DynatracePlugin);

Validator.localize("pt_BR", validatorPt);
moment.locale("pt-BR");

Vue.config.productionTip = false;
new Vue(vueOptions).$mount("#app");
