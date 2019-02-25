import Vuex from 'vuex';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Store } from 'vuex';

export abstract class FactoryStoreBase {
  public store!: Store<any>;
  public espiao!: any;

  public injetarAPI(): void {
    Container.snapshot(HttpService);
    this.stubarApi();
  }

  public dadoUmaStoreVazia() {
    const configuracao = this.configurarStore();
    this.store = new Vuex.Store(configuracao);
  }

  public restaurarEstadoInicial(): void {
    Container.restore(HttpService);

    if (this.espiao) {
      this.espiao.mockRestore();
    }
  }

  public get umAlunoQualquer(): number {
    return 145678;
  }

  protected abstract stubarApi(): void;

  protected abstract configurarStore(): any;
}
