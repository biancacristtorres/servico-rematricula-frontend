export class AlternarTurmaAtualActionRequest {

  public codigoDaDisciplina: number;
  public codigoUnico?: string;

  constructor(codigoDaDisciplina: number, codigoUnico?: string) {
    this.codigoDaDisciplina = codigoDaDisciplina;
    this.codigoUnico = codigoUnico;
  }

}
