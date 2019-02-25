import { MutationTree } from 'vuex';
import { AlunoState } from './state';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import Vue from 'vue';

export enum AlunoMutationTypes {
  SET_INFORMACOES_ALUNO = 'SET_INFORMACOES_ALUNO',
  LIMPAR_STORE = 'LIMPAR_STORE',
  SET_OBTENDO_INFORMACOES_ALUNO = 'SET_OBTENDO_INFORMACOES_ALUNO',
}

const mutations: MutationTree<AlunoState> = {

  [AlunoMutationTypes.SET_INFORMACOES_ALUNO](state: AlunoState, informacoesAluno: InformacoesAluno) {
    state.informacoesAluno = informacoesAluno;
  },

  [AlunoMutationTypes.LIMPAR_STORE](state: AlunoState) {
    Vue.set(state, 'informacoesAluno', undefined);
  },

  [AlunoMutationTypes.SET_OBTENDO_INFORMACOES_ALUNO](state: AlunoState, estaObtendoInformacoes: boolean) {
    state.estaObtendoInformacoes = estaObtendoInformacoes;
  },

};

export default mutations;
