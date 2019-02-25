import { Module } from 'vuex';
import { AlteracaoState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const alteracao: Module<AlteracaoState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};

export default alteracao;
