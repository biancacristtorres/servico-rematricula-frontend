import { Turma } from '@/model/Turma';

export class TurmasMutationRequest {
  public codigoDaDisciplina: number;
  public turmas: Turma[];

  constructor(codigoDaDisciplina: number, turmas: Turma[]) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.turmas = turmas;
  }
}
