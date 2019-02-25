import { EnviarComprovanteService } from '@/services/resumo/EnviarComprovanteService';
import { FactoryServiceBase } from '../../FactoryServiceBase';
import { DadoUmEnvioDeComprovanteComSucesso } from '../../../doubles/stubs/resumo/DadoUmEnvioDeComprovanteComSucesso';

export class EnviarComprovanteServiceFactory extends FactoryServiceBase<EnviarComprovanteService> {

  public espionarAPI() {
    this.espiao = jest.spyOn(DadoUmEnvioDeComprovanteComSucesso.prototype, 'post');
  }

  public dadoQueApiRetorneStatusDeSucesso(): void {
    this.apiStub = new DadoUmEnvioDeComprovanteComSucesso();
  }

  public get servico(): EnviarComprovanteService {
    return new EnviarComprovanteService(this.apiStub);
  }
}
