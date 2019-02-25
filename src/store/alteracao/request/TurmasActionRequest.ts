export class TurmasActionRequest {
  public codigoDaDisciplina: number;
  public codigoDoAluno: number;

  constructor(codigoDaDisciplina: number, codigoDoAluno: number) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.codigoDoAluno = codigoDoAluno;
  }
}
