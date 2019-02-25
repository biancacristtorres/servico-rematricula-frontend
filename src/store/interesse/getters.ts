import { GetterTree } from 'vuex';
import { InteresseState } from './state';
import { RootState } from '@/store';

export enum InteresseGetterTypes {
  DISCIPLINAS_PENDENTES = 'DISCIPLINAS_PENDENTES',
  DISCIPLINAS_ESTAO_CARREGADAS = 'DISCIPLINAS_ESTAO_CARREGADAS',
}

const getters: GetterTree<InteresseState, RootState> = {

  [InteresseGetterTypes.DISCIPLINAS_PENDENTES](state) {
    return state.disciplinas;
  },

};

export default getters;
