import { Module } from 'vuex';
import { state, MiniGradeState } from './state';
import { RootState } from '@/store';
import actions from './actions';
import mutations from './mutation';
import getters from './getters';

const miniGrade: Module<MiniGradeState, RootState> = {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};

export default miniGrade;
