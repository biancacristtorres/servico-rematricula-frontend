import { GetterTree } from 'vuex';
import { AlunoState } from './state';
import { RootState } from '@/store';

export enum AlunoGetterTypes {
  INFORMACOES_ALUNO = 'INFORMACOES_ALUNO',
  ESTA_OBTENDO_INFORMACOES_ALUNO = 'ESTA_OBTENDO_INFORMACOES_ALUNO',
}

const getters: GetterTree<AlunoState, RootState> = {

  [AlunoGetterTypes.INFORMACOES_ALUNO](state) {
    return state.informacoesAluno;
  },

  [AlunoGetterTypes.ESTA_OBTENDO_INFORMACOES_ALUNO](state) {
    return state.estaObtendoInformacoes;
  },

};

export default getters;
