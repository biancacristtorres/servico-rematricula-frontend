import { MutationTree } from 'vuex';
import { InteresseState } from './state';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export enum InteresseMutationTypes {
  SET_DISCIPLINAS = 'SET_DISCIPLINAS',
}

const mutations: MutationTree<InteresseState> = {

  [InteresseMutationTypes.SET_DISCIPLINAS](state: InteresseState, discplinas: DisciplinaComInteresse[]) {
    state.disciplinas = discplinas;
  },

};

export default mutations;
