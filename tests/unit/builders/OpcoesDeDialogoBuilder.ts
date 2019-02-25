import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

export class OpcoesDeDialogoBuilder {

  public get opcoes() {
    return new OpcoesDeDialogo(this.titulo, this.texto, this.textoConfirmar, this.textoRejeitar);
  }

  public static dadosAsOpcoes() {
    return new OpcoesDeDialogoBuilder();
  }
  private titulo: string;
  private texto: string;
  private textoConfirmar: string;
  private textoRejeitar: string;
  private exibir: boolean;

  private constructor() {
    this.titulo = '';
    this.texto = '';
    this.textoConfirmar = '';
    this.textoRejeitar = '';
    this.exibir = true;
  }

  public comTitulo(titulo: string): OpcoesDeDialogoBuilder {
    this.titulo = titulo;
    return this;
  }

  public comTexto(texto: string): OpcoesDeDialogoBuilder {
    this.texto = texto;
    return this;
  }

  public comTextoConfirmar(texto: string): OpcoesDeDialogoBuilder {
    this.textoConfirmar = texto;
    return this;
  }

  public comTextoRejeitar(texto: string): OpcoesDeDialogoBuilder {
    this.textoRejeitar = texto;
    return this;
  }
}
