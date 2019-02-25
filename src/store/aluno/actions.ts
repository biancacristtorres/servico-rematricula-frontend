import { ActionTree } from 'vuex';
import { AlunoState } from './state';
import { RootState } from '@/store';
import { AlunoMutationTypes } from './mutations';
import { Container } from 'typescript-ioc';
import { AlunoService } from '@/services/AlunoService';

export enum AlunoActionTypes {
  OBTER_INFORMACOES_ALUNO = 'OBTER_INFORMACOES_ALUNO',
  LIMPAR_INFORMACOES_ALUNO = 'LIMPAR_INFORMACOES_ALUNO',
  OBTENDO_INFORMACOES_ALUNO = 'OBTENDO_INFORMACOES_ALUNO',
  INFORMACOES_ALUNO_OBTIDAS = 'INFORMACOES_ALUNO_OBTIDAS',
}

const actions: ActionTree<AlunoState, RootState> = {

  async [AlunoActionTypes.OBTER_INFORMACOES_ALUNO]({ commit }, codigoDoAluno: number) {
    const service = (Container.get(AlunoService) as AlunoService);
    const informacoesAluno = await service.obterInformacoesAluno(codigoDoAluno);
    commit(AlunoMutationTypes.SET_INFORMACOES_ALUNO, informacoesAluno);
  },

  async [AlunoActionTypes.LIMPAR_INFORMACOES_ALUNO]({ commit }) {
    commit(AlunoMutationTypes.LIMPAR_STORE);
  },

  async [AlunoActionTypes.OBTENDO_INFORMACOES_ALUNO]({ commit }) {
    commit(AlunoMutationTypes.SET_OBTENDO_INFORMACOES_ALUNO, true);
  },

  async [AlunoActionTypes.INFORMACOES_ALUNO_OBTIDAS]({ commit }) {
    commit(AlunoMutationTypes.SET_OBTENDO_INFORMACOES_ALUNO, false);
  },

};

export default actions;
