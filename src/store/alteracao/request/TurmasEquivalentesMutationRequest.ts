import { Turma } from '@/model/Turma';

export class TurmasEquivalentesMutationRequest {
  public codigoDaDisciplina: number;
  public equivalentes: Turma[];

  constructor(codigoDaDisciplina: number, equivalentes: Turma[]) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.equivalentes = equivalentes;
  }
}
