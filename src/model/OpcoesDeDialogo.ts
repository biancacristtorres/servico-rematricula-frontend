export class OpcoesDeDialogo {
  public titulo: string;
  public texto: string;
  public textoConfirmar: string;
  public textoRejeitar: string;
  public exibir: boolean;

  constructor(titulo: string, texto: string, textoConfirmar: string, textoRejeitar: string) {
    this.titulo = titulo;
    this.texto = texto;
    this.textoConfirmar = textoConfirmar;
    this.textoRejeitar = textoRejeitar;
    this.exibir = true;
  }
}
