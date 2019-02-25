import {
  DadoUmaPreparacaoDeTurmasComSucesso,
} from '../../../doubles/stubs/alteracao/preparacaoDeTurmas/DadoUmaPreparacaoDeTurmasComSucesso';
import { FactoryServiceBase } from '../../FactoryServiceBase';
import { PreparacaoDeTurmasService } from '@/services/alteracao/PreparacaoDeTurmasService';

export class PreparacaoDeTurmasServiceFactory extends FactoryServiceBase<PreparacaoDeTurmasService> {

  public espionarAPI(): void {
    this.espiao = jest.spyOn(DadoUmaPreparacaoDeTurmasComSucesso.prototype, 'post');
  }

  public dadoQueApiRetorneStatusDeSucesso(): void {
    this.apiStub = new DadoUmaPreparacaoDeTurmasComSucesso();
  }

  public get servico(): PreparacaoDeTurmasService {
    return new PreparacaoDeTurmasService(this.apiStub);
  }

}
