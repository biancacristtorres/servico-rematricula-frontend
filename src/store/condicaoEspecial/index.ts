import { Module } from 'vuex';
import { CondicaoEspecialState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const condicaoEspecial: Module<CondicaoEspecialState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};

export default condicaoEspecial;
