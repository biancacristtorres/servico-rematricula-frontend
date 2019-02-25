import { GetterTree } from 'vuex';
import { AlteracaoState } from './state';
import { RootState } from '@/store';
import { Disciplina } from '@/model/Disciplina';
import {
  FiltrarStateDeDisciplinaService,
} from '@/services/alteracao/FiltrarStateDeDisciplinaService';

export enum AlteracaoGetterTypes {
  DISCIPLINA = 'DISCIPLINA',
  POSSUI_TURMAS = 'POSSUI_TURMAS',
  TURMA_ATUAL = 'TURMA_ATUAL',
  ESTA_CARREGANDO = 'ESTA_CARREGANDO',
  POSSUI_ALTERACAO = 'POSSUI_ALTERACAO',
  FILTRO = 'FILTRO',
  TURMAS_FILTRADAS = 'TURMAS_FILTRADAS',
  TURMAS_EQUIVALENTES_FILTRADAS = 'TURMAS_EQUIVALENTES_FILTRADAS',
  TURMAS_ESPECIAIS_FILTRADAS = 'TURMAS_ESPECIAIS_FILTRADAS',
}

const filtrarStateDeDisciplinaService = new FiltrarStateDeDisciplinaService();

const getters: GetterTree<AlteracaoState, RootState> = {

  [AlteracaoGetterTypes.ESTA_CARREGANDO](state) {
    return state.alterando || state.preparandoTurmas;
  },

  [AlteracaoGetterTypes.DISCIPLINA](state) {
    const encontrarDisciplina = (codigoDaDisciplina: number) => filtrarStateDeDisciplinaService
      .processar(state.disciplinas, codigoDaDisciplina);

    return encontrarDisciplina;
  },

  [AlteracaoGetterTypes.POSSUI_TURMAS](state) {

    const possuiTurmas = (codigoDaDisciplina: number) => {
      const disciplina: Disciplina = filtrarStateDeDisciplinaService
        .processar(state.disciplinas, codigoDaDisciplina);

      return disciplina.turmas.length > 0 ||
        disciplina.turmasEquivalentes.length > 0 ||
        disciplina.turmasEspeciais.length > 0;
    };

    return possuiTurmas;
  },

  [AlteracaoGetterTypes.TURMA_ATUAL](state) {

    const turmaAtual = (codigoDaDisciplina: number) => {
      const disciplina: Disciplina = filtrarStateDeDisciplinaService
        .processar(state.disciplinas, codigoDaDisciplina);

      const atualDasTurmas = disciplina.turmas.find((t) => t.eTurmaAtual);
      const atualDasEquivalentes = disciplina.turmasEquivalentes.find((t) => t.eTurmaAtual);
      const atualDasEspeciais = disciplina.turmasEspeciais.find((t) => t.eTurmaAtual);

      return atualDasTurmas || atualDasEquivalentes || atualDasEspeciais;
    };

    return turmaAtual;
  },

  [AlteracaoGetterTypes.POSSUI_ALTERACAO](state) {
    return state.possuiAlteracao;
  },

  [AlteracaoGetterTypes.FILTRO](state) {
    return state.filtro;
  },

  [AlteracaoGetterTypes.TURMAS_FILTRADAS](state) {
    const turmaFiltrada = (codigoDaDisciplina: number) => {
      const disciplina: Disciplina = filtrarStateDeDisciplinaService.processar(
        state.disciplinas, codigoDaDisciplina,
      );

      return state.filtro.exibirTurnosDiferentes ?
        disciplina.turmas :
        disciplina.turmas.filter((t) => t.eDoTurnoDoAluno);
    };

    return turmaFiltrada;
  },

  [AlteracaoGetterTypes.TURMAS_EQUIVALENTES_FILTRADAS](state) {
    const turmasEquivalentesFiltradas = (codigoDaDisciplina: number) => {
      const disciplina: Disciplina = filtrarStateDeDisciplinaService.processar(
        state.disciplinas, codigoDaDisciplina,
      );

      return state.filtro.exibirTurnosDiferentes ?
        disciplina.turmasEquivalentes :
        disciplina.turmasEquivalentes.filter((t) => t.eDoTurnoDoAluno);
    };

    return turmasEquivalentesFiltradas;
  },

  [AlteracaoGetterTypes.TURMAS_ESPECIAIS_FILTRADAS](state) {
    const turmasEspeciaisFiltradas = (codigoDaDisciplina: number) => {
      const disciplina: Disciplina = filtrarStateDeDisciplinaService.processar(
        state.disciplinas, codigoDaDisciplina,
      );

      return state.filtro.exibirTurnosDiferentes ?
        disciplina.turmasEspeciais :
        disciplina.turmasEspeciais.filter((t) => t.eDoTurnoDoAluno);
    };

    return turmasEspeciaisFiltradas;
  },

};

export default getters;
