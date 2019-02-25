import { MutationTree } from 'vuex';
import { CondicaoEspecialState } from './state';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export enum MutationsTypes {
  SET_SOLICITADAS = 'SET_SOLICITADAS',
}

const mutations: MutationTree<CondicaoEspecialState> = {

  [MutationsTypes.SET_SOLICITADAS](state: CondicaoEspecialState, solicitadas: CondicaoEspecial[]) {
    state.solicitadas = solicitadas;
  },

};

export default mutations;
