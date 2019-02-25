import { MutationTree } from 'vuex';
import { MiniGradeState } from './state';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';

export enum MiniGradeMutationTypes {
  SET_MINI_GRADE = 'SET_MINI_GRADE',
}

const mutations: MutationTree<MiniGradeState> = {

  [MiniGradeMutationTypes.SET_MINI_GRADE](state: MiniGradeState, horarios: HorarioDaMiniGrade[]) {
    state.horarios = horarios;
  },

};

export default mutations;
