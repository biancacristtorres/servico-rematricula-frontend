import { AlteracaoRequest } from './request/AlteracaoRequest';
import { AlteracaoResponse } from './response/AlteracaoResponse';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { IMatriculaService } from './interface/IMatriculaService';

export class CancelamentoDeMatriculaService implements IMatriculaService {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  protected http!: HttpService;

  constructor(@Inject http: HttpService) {
    this.http = http;
  }

  public async processar(request: AlteracaoRequest): Promise<AlteracaoResponse> {
    try {
      return await this.responseDeSucesso(request);
    } catch (error) {
      return this.responseDeErro();
    }
  }

  private async responseDeSucesso(request: AlteracaoRequest): Promise<AlteracaoResponse> {
    const url =
     `${ this.urlBase }/api/Matricula/${ request.codigoDoAluno }/Disciplina/${ request.codigoDaDisciplina }`;

    const response = await this.http.delete(url);

    const alteracaoResponse = new AlteracaoResponse();
    alteracaoResponse.sucesso = true;
    alteracaoResponse.miniGrade = response.data.horarios;
    return alteracaoResponse;
  }

  private responseDeErro(): AlteracaoResponse {
    const alteracaoResponse = new AlteracaoResponse();
    alteracaoResponse.sucesso = false;
    alteracaoResponse.opcoesDeDialogo = new OpcoesDeDialogo(
      'OPS!',
      'Ocorreu um problema na sua seleção.',
      'OK',
      '',
    );
    return alteracaoResponse;
  }
}
