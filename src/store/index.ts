import Vue from 'vue';
import Vuex from 'vuex';
import autorizacao from 'componente-frontend-core/store/autorizacao';
import interesse from './interesse';
import condicaoEspecial from './condicaoEspecial';
import featureToggle from 'componente-frontend-core/store/featureToggle';
import alteracao from './alteracao';
import resumo from './resumo';
import aluno from './aluno';
import actions from './actions';
import marca from './marca';
import miniGrade from './miniGrade';
import { state } from './state';
import mutations from './mutations';

export { StoreNamespaces } from '@/store/namespaces';

Vue.use(Vuex);

export class RootState {
}

const modules = {
  autorizacao,
  interesse,
  condicaoEspecial,
  featureToggle,
  alteracao,
  resumo,
  aluno,
  marca,
  miniGrade,
};

const store = new Vuex.Store({
  modules,
  actions,
  state,
  mutations,
});

Object.assign(window, { $store: store });

export default store;
