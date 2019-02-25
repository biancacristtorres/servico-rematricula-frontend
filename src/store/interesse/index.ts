import { Module } from 'vuex';
import { InteresseState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const interesse: Module<InteresseState, RootState> = {
  actions,
  state,
  mutations,
  getters,
  namespaced: true,
};

export default interesse;
