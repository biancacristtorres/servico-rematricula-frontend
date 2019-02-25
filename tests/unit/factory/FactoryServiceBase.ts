import { HttpService } from 'componente-frontend-core/services/HttpService';

export abstract class FactoryServiceBase<T>  {
  public espiao!: any;
  public abstract servico: T;

  protected apiStub!: HttpService;

  private envInicial: any;
  private variavelDeAmbiente!: string;

  public restaurarEstadoInicialDoTeste(): void {
    if (this.espiao) {
      this.espiao.mockRestore();
    }

    if (this.variavelDeAmbiente) {
      this.restaurarAmbiente();
    }
  }

  public setarVariavelAmbiente(variavel: string, valor: string): void {
    this.variavelDeAmbiente = variavel;

    this.envInicial = process.env[this.variavelDeAmbiente];

    process.env[this.variavelDeAmbiente] = valor;
  }

  private restaurarAmbiente(): void {
    process.env[this.variavelDeAmbiente] = this.envInicial;
  }

}
