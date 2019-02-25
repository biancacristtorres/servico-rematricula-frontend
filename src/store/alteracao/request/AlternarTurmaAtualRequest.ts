export class AlternarTurmaAtualRequest {

  public codigoDaDisciplina: number;
  public eUmaRemocaoDeTurma: boolean;
  public codigoUnico?: string;
  public eTurmaAtual?: boolean;

  constructor(codigoDaDisciplina: number, codigoUnico?: string, eTurmaAtual?: boolean) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.codigoUnico = codigoUnico;
    this.eTurmaAtual = eTurmaAtual;
    this.eUmaRemocaoDeTurma = eTurmaAtual === true;
  }

}
