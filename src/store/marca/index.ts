import { Module } from 'vuex';
import { state, MarcaState } from './state';
import { RootState } from '@/store';
import getters from './getters';

const marca: Module<MarcaState, RootState> = {
  state,
  getters,
  namespaced: true,
};

export default marca;
