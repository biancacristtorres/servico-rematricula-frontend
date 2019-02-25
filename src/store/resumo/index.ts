import { Module } from 'vuex';
import { ResumoState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const Resumo: Module<ResumoState, RootState> = {
  actions,
  state,
  mutations,
  getters,
  namespaced: true,
};

export default Resumo;
