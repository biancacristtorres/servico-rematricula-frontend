import { Horario } from '@/model/Horario';

export class ResumoState {
  public horarios?: Horario[];
  public disciplinasSemHorario?: string[];
  public existemDisciplinas?: boolean;
  public existemDisciplinasNaFilaDeEspera?: boolean;
  public existemTurmasEspeciaisNaoConfirmadas?: boolean;
}

export const state: ResumoState = {
  horarios: [],
  disciplinasSemHorario: [],
  existemDisciplinas: true,
  existemDisciplinasNaFilaDeEspera: false,
  existemTurmasEspeciaisNaoConfirmadas: false,
};
