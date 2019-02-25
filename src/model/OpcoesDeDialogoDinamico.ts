import { ModelDeDialogoDinamico } from './ModelDeDialogoDinamico';

export class OpcoesDeDialogoDinamico {
  public componente!: string;
  public titulo!: string;
  public textoConfirmar!: string;
  public textoCancelar!: string;
  public modelDoComponente!: ModelDeDialogoDinamico;
  public exibir: boolean = true;
}
