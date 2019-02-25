import { Turma } from '@/model/Turma';

export class TurmasEspeciaisMutationRequest {
  public codigoDaDisciplina: number;
  public especiais: Turma[];

  constructor(codigoDaDisciplina: number, especiais: Turma[]) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.especiais = especiais;
  }

}
