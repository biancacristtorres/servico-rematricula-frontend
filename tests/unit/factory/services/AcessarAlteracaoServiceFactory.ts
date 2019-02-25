import { FactoryServiceBase } from '../FactoryServiceBase';
import { AcessarAlteracaoService } from '@/services/alteracao/AcessarAlteracaoService';
import {
  DadoUmAcessoLiberadoAAlteracao,
} from '../../doubles/stubs/resumo/DadoUmAcessoLiberadoAAlteracao';

export class AcessarAlteracaoServiceFactory extends FactoryServiceBase<AcessarAlteracaoService> {

  public dadoQueAAPIRetorneComSucesso(): void {
    this.apiStub = new DadoUmAcessoLiberadoAAlteracao();
  }

  public espionarAPI() {
    this.espiao = jest.spyOn(DadoUmAcessoLiberadoAAlteracao.prototype, 'get');
  }

  public get servico(): AcessarAlteracaoService {
    return new AcessarAlteracaoService(this.apiStub);
  }

}
