import { MutationTree } from 'vuex';
import { ResumoState } from './state';
import { Horario } from '@/model/Horario';
import { StatusDaDisciplina } from '@/common/enum/StatusDaDisciplina';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';


export enum ResumoMutationTypes {
  SET_HORARIOS = 'SET_HORARIOS',
  SET_DISCIPLINAS_SEM_HORARIO = 'SET_DISCIPLINAS_SEM_HORARIO',
  LIMPAR_STORE = 'LIMPAR_STORE',
}

const mutations: MutationTree<ResumoState> = {

  [ResumoMutationTypes.SET_HORARIOS](state: ResumoState, horarios: Horario[]) {
    state.horarios = horarios;
    state.existemDisciplinas = horarios.length > 0;

    for (const horario of horarios) {
      for (let d = 2; d <= 7; d++) {
        if (horario.disciplinasPorDiaDeSemana
          && horario.disciplinasPorDiaDeSemana[d] != null
          && horario.disciplinasPorDiaDeSemana[d]
            .some((h) => h.status === StatusDaDisciplina.FilaDeEspera)) {

          state.existemDisciplinasNaFilaDeEspera = true;
          break;
        }
      }
    }

    state.existemTurmasEspeciaisNaoConfirmadas = horarios.some((h) =>
      validarPossuiDisciplinaReservada(h.disciplinasPorDiaDeSemana));
  },

  [ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO](state: ResumoState, disciplinasSemHorario: string[]) {
    state.disciplinasSemHorario = disciplinasSemHorario;
  },

  [ResumoMutationTypes.LIMPAR_STORE](state: ResumoState) {
    state.horarios = [];
    state.disciplinasSemHorario = [];
    state.existemDisciplinas = true;
    state.existemDisciplinasNaFilaDeEspera = false;
  },

};

const validarPossuiDisciplinaReservada = (disciplinas: DisciplinasPorDiaDeSemana | undefined): boolean => {
  let possuiDisciplinaReservada = false;
  if (disciplinas) {
    possuiDisciplinaReservada = Object.values(disciplinas).some(
      (disciplinasResumo: DisciplinaResumo[]) => {
        return (disciplinasResumo || []).some((d) => d.status === StatusDaDisciplina.AguardandoConfirmacao);
      });
  }

  return possuiDisciplinaReservada;
};

export default mutations;
