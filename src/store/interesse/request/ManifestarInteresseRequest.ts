import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class ManifestarInteresseRequest {
  public codigoDoAluno: number;
  public disciplinas: DisciplinaComInteresse[];

  constructor(codigoDoAluno: number, disciplinas: DisciplinaComInteresse[]) {
    this.codigoDoAluno = codigoDoAluno;
    this.disciplinas = disciplinas;
  }
}
