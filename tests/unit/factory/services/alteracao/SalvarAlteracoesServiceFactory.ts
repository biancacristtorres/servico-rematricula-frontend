import { FactoryServiceBase } from '../../FactoryServiceBase';
import { SalvarAlteracoesService } from '@/services/alteracao/SalvarAlteracoesService';
import {
  DadoUmaAlteracaoSalvaComSucesso,
} from '../../../doubles/stubs/alteracao/salvarAlteracoes/DadoUmaAlteracaoSalvaComSucesso';

export class SalvarAlteracoesServiceFactory extends FactoryServiceBase<SalvarAlteracoesService> {

  public dadoQueApiRetorneStatusDeSucesso(): void {
    this.apiStub = new DadoUmaAlteracaoSalvaComSucesso();
  }

  public espionarAPI() {
    this.espiao = jest.spyOn(DadoUmaAlteracaoSalvaComSucesso.prototype, 'post');
  }

  public get servico(): SalvarAlteracoesService {
    return new SalvarAlteracoesService(this.apiStub);
  }

}
