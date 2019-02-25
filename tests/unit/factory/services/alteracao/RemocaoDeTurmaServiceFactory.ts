import { FactoryServiceBase } from '../../FactoryServiceBase';
import { RemocaoDeTurmaService } from '@/services/alteracao/RemocaoDeTurmaService';
import {
  DadoUmaRemocaoDeTurmaComSucesso,
} from '../../../doubles/stubs/alteracao/remocaoDeTurmas/DadoUmaRemocaoDeTurmaComSucesso';

export class RemocaoDeTurmaServiceFactory extends FactoryServiceBase<RemocaoDeTurmaService> {

  public dadoQueApiRetorneStatusDeSucesso(): void {
    this.apiStub = new DadoUmaRemocaoDeTurmaComSucesso();
  }

  public espionarAPI() {
    this.espiao = jest.spyOn(DadoUmaRemocaoDeTurmaComSucesso.prototype, 'delete');
  }

  public get servico(): RemocaoDeTurmaService {
    return new RemocaoDeTurmaService(this.apiStub);
  }

}
