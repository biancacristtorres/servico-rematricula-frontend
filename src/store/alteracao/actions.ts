import { ActionTree } from 'vuex';
import { AlteracaoState } from './state';
import { AlteracaoMutationsTypes } from './mutations';
import store, { RootState, StoreNamespaces } from '@/store';
import { Container } from 'typescript-ioc';
import { DisciplinaDisponivelService } from '@/services/alteracao/DisciplinaDisponivelService';
import { TurmasActionRequest } from './request/TurmasActionRequest';
import { TurmasService } from '@/services/alteracao/TurmasService';
import { Turma } from '@/model/Turma';
import { TurmasMutationRequest } from './request/TurmasMutationRequest';
import { TurmasEquivalentesService } from '@/services/alteracao/TurmasEquivalentesService';
import { TurmasEquivalentesMutationRequest } from './request/TurmasEquivalentesMutationRequest';
import { AlternarTurmaAtualActionRequest } from './request/AlternarTurmaAtualActionRequest';
import { AlternarTurmaAtualRequest } from './request/AlternarTurmaAtualRequest';
import { TurmasEspeciaisService } from '@/services/alteracao/TurmasEspeciaisService';
import { TurmasEspeciaisMutationRequest } from './request/TurmasEspeciaisMutationRequest';
import { ConcluirAlteracaoDeSucessoActionRequest } from './request/ConcluirAlteracaoDeSucessoActionRequest';
import { Filtro } from '@/model/Filtro';
import { MiniGradeMutationTypes } from '../miniGrade/mutation';

export enum AlteracaoActionTypes {
  DISCIPLINAS = 'DISCIPLINAS',
  TURMAS = 'TURMAS',
  TURMAS_EQUIVALENTES = 'TURMAS_EQUIVALENTES',
  ALTERNAR_TURMA_ATUAL = 'ALTERNAR_TURMA_ATUAL',
  ALTERANDO_TURMAS = 'ALTERANDO_TURMAS',
  ALTERACAO_FINALIZADA = 'ALTERACAO_FINALIZADA',
  PREPARANDO_TURMAS = 'PREPARANDO_TURMAS',
  PREPARACAO_FINALIZADA = 'PREPARACAO_FINALIZADA',
  TURMAS_ESPECIAIS = 'TURMAS_ESPECIAIS',
  INFORMAR_ALTERACAO = 'INFORMAR_ALTERACAO',
  LIMPAR_ALTERACAO = 'LIMPAR_ALTERACAO',
  CONCLUIR_ALTERACAO_DE_SUCESSO = 'CONCLUIR_ALTERACAO_DE_SUCESSO',
  ALTERAR_FILTRO = 'ALTERAR_FILTRO',
}

const actions: ActionTree<AlteracaoState, RootState> = {

  async [AlteracaoActionTypes.DISCIPLINAS]({ commit }, codigoDoAluno: number) {

    const service = (Container.get(DisciplinaDisponivelService) as DisciplinaDisponivelService);

    const disciplinas = await service.obter(codigoDoAluno);

    commit(AlteracaoMutationsTypes.SET_DISCIPLINAS, disciplinas);
  },

  async [AlteracaoActionTypes.TURMAS]({ commit }, actionRequest: TurmasActionRequest) {
    const service = (Container.get(TurmasService) as TurmasService);

    const turmas: Turma[] = await service.obterPor(
      actionRequest.codigoDaDisciplina, actionRequest.codigoDoAluno,
    );

    const mutationRequest = new TurmasMutationRequest(
      actionRequest.codigoDaDisciplina, turmas,
    );

    commit(AlteracaoMutationsTypes.SET_TURMAS, mutationRequest);
  },

  async [AlteracaoActionTypes.TURMAS_EQUIVALENTES]({ commit }, actionRequest: TurmasActionRequest) {
    const service = (Container.get(TurmasEquivalentesService) as TurmasEquivalentesService);

    const equivalentes: Turma[] = await service.obterPor(
      actionRequest.codigoDaDisciplina, actionRequest.codigoDoAluno,
    );

    const mutationRequest = new TurmasEquivalentesMutationRequest(
      actionRequest.codigoDaDisciplina, equivalentes,
    );

    commit(AlteracaoMutationsTypes.SET_TURMAS_EQUIVALENTES, mutationRequest);
  },

  async [AlteracaoActionTypes.TURMAS_ESPECIAIS]({ commit }, actionRequest: TurmasActionRequest) {
    const service = (Container.get(TurmasEspeciaisService) as TurmasEspeciaisService);

    const especiais: Turma[] = await service.obterPor(
      actionRequest.codigoDaDisciplina, actionRequest.codigoDoAluno,
    );

    const mutationRequest = new TurmasEspeciaisMutationRequest(
      actionRequest.codigoDaDisciplina, especiais,
    );

    commit(AlteracaoMutationsTypes.SET_TURMAS_ESPECIAIS, mutationRequest);
  },

  async [AlteracaoActionTypes.ALTERNAR_TURMA_ATUAL]({ commit }, actionRequest: AlternarTurmaAtualActionRequest) {
    const mutationRequest = new AlternarTurmaAtualRequest(
      actionRequest.codigoDaDisciplina, actionRequest.codigoUnico,
    );

    commit(AlteracaoMutationsTypes.ALTERNAR_TURMA_ATUAL, mutationRequest);
  },

  async [AlteracaoActionTypes.ALTERANDO_TURMAS]({ commit }) {
    commit(AlteracaoMutationsTypes.SET_ALTERANDO, true);
  },

  async [AlteracaoActionTypes.ALTERACAO_FINALIZADA]({ commit }) {
    commit(AlteracaoMutationsTypes.SET_ALTERANDO, false);
  },

  async [AlteracaoActionTypes.PREPARANDO_TURMAS]({ commit }) {
    commit(AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS, true);
  },

  async [AlteracaoActionTypes.PREPARACAO_FINALIZADA]({ commit }) {
    commit(AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS, false);
  },

  async [AlteracaoActionTypes.INFORMAR_ALTERACAO]({ commit }) {
    commit(AlteracaoMutationsTypes.SET_ALTERACAO);
  },

  async [AlteracaoActionTypes.LIMPAR_ALTERACAO]({ commit }) {
    commit(AlteracaoMutationsTypes.LIMPAR_ALTERACAO);
  },

  async [AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO](
    { commit },
    actionRequest: ConcluirAlteracaoDeSucessoActionRequest) {
      const mutationRequest = new AlternarTurmaAtualRequest(
        actionRequest.codigoDaDisciplina, actionRequest.codigoUnico, actionRequest.eTurmaAtual,
      );

      commit(AlteracaoMutationsTypes.ALTERNAR_TURMA_ATUAL, mutationRequest);
      commit(AlteracaoMutationsTypes.SET_ALTERACAO);

      store.commit(`${ StoreNamespaces.MINI_GRADE }/${ MiniGradeMutationTypes.SET_MINI_GRADE }`,
        actionRequest.horariosDaMiniGrade);
  },

  async [AlteracaoActionTypes.ALTERAR_FILTRO]({ commit }, novoFiltro: Filtro) {
    commit(AlteracaoMutationsTypes.SET_NOVO_FILTRO, Object.assign({}, novoFiltro));
  },
};

export default actions;
