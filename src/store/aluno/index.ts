import { Module } from 'vuex';
import { AlunoState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const Aluno: Module<AlunoState, RootState> = {
  actions,
  state,
  mutations,
  getters,
  namespaced: true,
};

export default Aluno;
