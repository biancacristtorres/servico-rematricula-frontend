import { MutationTree } from 'vuex';
import { AlteracaoState } from './state';
import { Disciplina } from '@/model/Disciplina';
import { TurmasMutationRequest } from './request/TurmasMutationRequest';
import { TurmasEquivalentesMutationRequest } from './request/TurmasEquivalentesMutationRequest';
import Vue from 'vue';
import { FiltrarStateDeDisciplinaService } from '@/services/alteracao/FiltrarStateDeDisciplinaService';
import { AlternarTurmaAtualRequest } from './request/AlternarTurmaAtualRequest';
import { MapearTurmasService } from '@/services/alteracao/MapearTurmasService';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { TurmasEspeciaisMutationRequest } from './request/TurmasEspeciaisMutationRequest';
import { Filtro } from '@/model/Filtro';

export enum AlteracaoMutationsTypes {
  SET_DISCIPLINAS = 'SET_DISCIPLINAS',
  SET_TURMAS = 'SET_TURMAS',
  SET_TURMAS_EQUIVALENTES = 'SET_TURMAS_EQUIVALENTES',
  SET_TURMAS_ESPECIAIS = 'SET_TURMAS_ESPECIAIS',
  ALTERNAR_TURMA_ATUAL = 'ALTERNAR_TURMA_ATUAL',
  SET_ALTERANDO = 'SET_ALTERANDO',
  SET_PREPARANDO_TURMAS = 'PREPARANDO_TURMAS',
  SET_ALTERACAO = 'SET_ALTERACAO',
  LIMPAR_ALTERACAO = 'LIMPAR_ALTERACAO',
  SET_NOVO_FILTRO = 'SET_NOVO_FILTRO',
}

const filtrarStateDeDisciplinaService = new FiltrarStateDeDisciplinaService();
const mapearTurmasService = new MapearTurmasService();

const mutations: MutationTree<AlteracaoState> = {

  [AlteracaoMutationsTypes.SET_ALTERANDO](state: AlteracaoState, alterando: boolean) {
    state.alterando = alterando;
  },

  [AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS](state: AlteracaoState, preparandoTurmas: boolean) {
    state.preparandoTurmas = preparandoTurmas;
  },

  [AlteracaoMutationsTypes.SET_DISCIPLINAS](state: AlteracaoState, discplinas: Disciplina[]) {
    state.disciplinas = discplinas;
  },

  [AlteracaoMutationsTypes.SET_TURMAS](state: AlteracaoState, request: TurmasMutationRequest) {
    const disciplina = filtrarStateDeDisciplinaService
      .processar(state.disciplinas, request.codigoDaDisciplina);

    Vue.set(disciplina, 'turmas', request.turmas);
  },

  [AlteracaoMutationsTypes.SET_TURMAS_EQUIVALENTES](state: AlteracaoState, request: TurmasEquivalentesMutationRequest) {
    const disciplina = filtrarStateDeDisciplinaService
      .processar(state.disciplinas, request.codigoDaDisciplina);

    Vue.set(disciplina, 'turmasEquivalentes', request.equivalentes);
  },

  [AlteracaoMutationsTypes.SET_TURMAS_ESPECIAIS](state: AlteracaoState, request: TurmasEspeciaisMutationRequest) {
    const disciplina = filtrarStateDeDisciplinaService
      .processar(state.disciplinas, request.codigoDaDisciplina);

    Vue.set(disciplina, 'turmasEspeciais', request.especiais);
  },

  [AlteracaoMutationsTypes.ALTERNAR_TURMA_ATUAL](state: AlteracaoState, request: AlternarTurmaAtualRequest) {
    const disciplina: Disciplina = filtrarStateDeDisciplinaService
      .processar(state.disciplinas, request.codigoDaDisciplina);

    disciplina.situacao = request.eUmaRemocaoDeTurma ?
      SituacaoDaDisciplina.Liberada :
      SituacaoDaDisciplina.Solicitada;

    Vue.set(
      disciplina,
      'turmas',
      mapearTurmasService.alternarTurmaAtual(disciplina.turmas, request.codigoUnico, request.eUmaRemocaoDeTurma),
    );

    Vue.set(
      disciplina,
      'turmasEquivalentes',
      mapearTurmasService.alternarTurmaAtual(
        disciplina.turmasEquivalentes, request.codigoUnico,  request.eUmaRemocaoDeTurma),
    );

    Vue.set(
      disciplina,
      'turmasEspeciais',
      mapearTurmasService.alternarTurmaAtual(
        disciplina.turmasEspeciais, request.codigoUnico,  request.eUmaRemocaoDeTurma),
    );
  },

  [AlteracaoMutationsTypes.SET_ALTERACAO](state: AlteracaoState) {
    state.possuiAlteracao = true;
  },

  [AlteracaoMutationsTypes.LIMPAR_ALTERACAO](state: AlteracaoState) {
    state.possuiAlteracao = false;
  },

  [AlteracaoMutationsTypes.SET_NOVO_FILTRO](state: AlteracaoState, novoFiltro: Filtro) {
    state.filtro = novoFiltro;
  },

};

export default mutations;
