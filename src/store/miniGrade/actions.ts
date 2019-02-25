import { ActionTree } from 'vuex';
import { MiniGradeState } from './state';
import { RootState } from '@/store';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { MiniGradeMutationTypes } from './mutation';

export enum MiniGradeActionTypes  {
  CARREGAR_MINI_GRADE = 'CARREGAR_MINI_GRADE',
}

const actions: ActionTree<MiniGradeState, RootState> = {

  async [MiniGradeActionTypes.CARREGAR_MINI_GRADE]({ commit }, horarios: HorarioDaMiniGrade[]) {
    commit(MiniGradeMutationTypes.SET_MINI_GRADE, horarios);
  },

};

export default actions;
