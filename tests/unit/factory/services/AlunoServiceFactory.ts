import { AlunoService } from '@/services/AlunoService';
import { FactoryServiceBase } from '../FactoryServiceBase';
import { DadoUmaRequisicaoComSucesso } from '../../doubles/stubs/aluno/DadoUmaRequisicaoComSucesso';

export class AlunoServiceFactory extends FactoryServiceBase<AlunoService> {

  public DadoUmaRequisicaoComSucesso(): void {
    this.apiStub = new DadoUmaRequisicaoComSucesso();
  }

  public get servico(): AlunoService {
    return new AlunoService(this.apiStub);
  }
}
