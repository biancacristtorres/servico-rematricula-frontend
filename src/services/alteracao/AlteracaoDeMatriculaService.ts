import { IMatriculaService } from './interface/IMatriculaService';
import { AlteracaoRequest } from './request/AlteracaoRequest';
import { Container } from 'typescript-ioc';
import { MatriculaDeTurmaService } from './MatriculaDeTurmaService';
import { CancelamentoDeMatriculaService } from './CancelamentoDeMatriculaService';
import { AlteracaoResponse } from './response/AlteracaoResponse';

export class AlteracaoDeMatriculaService {
  private servico!: IMatriculaService;

  public async processar(request: AlteracaoRequest): Promise<AlteracaoResponse> {
    if (request.turma.eTurmaAtual) {
      this.servico = Container.get(CancelamentoDeMatriculaService);
    } else {
      this.servico = Container.get(MatriculaDeTurmaService);
    }

    return await this.servico.processar(request);
  }

}
