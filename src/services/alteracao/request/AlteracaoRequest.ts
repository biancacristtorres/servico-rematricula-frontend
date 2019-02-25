import { Turma } from '@/model/Turma';

export class AlteracaoRequest {
  public turma: Turma;
  public codigoDoAluno: number;
  public codigoDaDisciplina: number;
  public nomeDaDisciplina: string;

  constructor(turma: Turma, codigoDoAluno: number, codigoDaDisciplina: number, nomeDaDisciplina: string) {
    this.turma = turma;
    this.codigoDoAluno = codigoDoAluno;
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.nomeDaDisciplina = nomeDaDisciplina;
  }
}
