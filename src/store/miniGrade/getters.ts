import { GetterTree } from 'vuex';
import { MiniGradeState } from './state';
import { RootState } from '@/store';

export enum MiniGradeGetterTypes {
  MINI_GRADE = 'MINI_GRADE',
}

const getters: GetterTree<MiniGradeState, RootState> = {

  [MiniGradeGetterTypes.MINI_GRADE](state) {
    return state.horarios;
  },

};

export default getters;
