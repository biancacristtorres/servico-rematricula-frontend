import { FactoryServiceBase } from '../FactoryServiceBase';
import { ObtemAcessoAoFreshDeskComSucesso } from '../../doubles/stubs/freshDesk/ObtemAcessoAoFreshDeskComSucesso';
import { ObterAcessoAoFreshDeskService } from '@/services/ObterAcessoAoFreshDeskService';

export class ObterAcessoAoFreshDeskServiceFactory extends FactoryServiceBase<ObterAcessoAoFreshDeskService> {
  public codigoDoAluno!: number;

  public dadoOAluno(codigoDoAluno: number): void {
    this.codigoDoAluno = codigoDoAluno;
  }

  public espionarAPI(): void {
    this.espiao = jest.spyOn(ObtemAcessoAoFreshDeskComSucesso.prototype, 'get');
  }

  public dadoQueApiRespondaComSucesso(): void {
    this.apiStub = new ObtemAcessoAoFreshDeskComSucesso();
  }

  public get servico(): ObterAcessoAoFreshDeskService {
    return new ObterAcessoAoFreshDeskService(this.apiStub);
  }
}
