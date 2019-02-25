import { HorarioDaMiniGrade } from '../../../model/HorarioDaMiniGrade';
export class ConcluirAlteracaoDeSucessoActionRequest {
  public codigoDaDisciplina: number;
  public codigoUnico?: string;
  public eTurmaAtual?: boolean;
  public horariosDaMiniGrade?: HorarioDaMiniGrade[];

  constructor(
    codigoDaDisciplina: number,
    codigoUnico?: string,
    eTurmaAtual?: boolean,
    horariosDaMiniGrade?: HorarioDaMiniGrade[]) {

    this.codigoDaDisciplina = codigoDaDisciplina;
    this.codigoUnico = codigoUnico;
    this.eTurmaAtual = eTurmaAtual;
    this.horariosDaMiniGrade = horariosDaMiniGrade;
  }
}
