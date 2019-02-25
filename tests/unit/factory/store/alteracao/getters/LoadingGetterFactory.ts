import { FactoryStoreAlteracaoBase } from '../FactoryStoreAlteracaoBase';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';

export class LoadingGetterFactory extends FactoryStoreAlteracaoBase {

  public dadoPreparandoTurmas(preparandoTurmas: boolean): void {
    this.store.commit(AlteracaoMutationsTypes.SET_PREPARANDO_TURMAS, preparandoTurmas);
  }

  public dadoAlterando(alterando: boolean): void {
    this.store.commit(AlteracaoMutationsTypes.SET_ALTERANDO, alterando);
  }

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

}
