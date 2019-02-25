import { AlteracaoRequest } from './request/AlteracaoRequest';
import { AlteracaoResponse } from './response/AlteracaoResponse';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { IMatriculaService } from './interface/IMatriculaService';

export class MatriculaDeTurmaService implements IMatriculaService {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  protected http!: HttpService;

  constructor(@Inject http: HttpService) {
    this.http = http;
  }

  public async processar(request: AlteracaoRequest): Promise<AlteracaoResponse> {
    try {
      return await this.responseDeSucesso(request);
    } catch (error) {
      return this.responseDeErro(error);
    }
  }

  private async responseDeSucesso(request: AlteracaoRequest): Promise<AlteracaoResponse> {
    const url = `${this.urlBase}/api/Matricula/${ request.codigoDoAluno }`;

    const data = {
      codigoDaDisciplina: request.codigoDaDisciplina,
      nomeDaDisciplina: request.nomeDaDisciplina,
      turma: request.turma,
    };

    const response = await this.http.put(url, data);

    const alteracaoResponse = new AlteracaoResponse();
    alteracaoResponse.sucesso = true;
    alteracaoResponse.miniGrade = response.data.horarios;
    return alteracaoResponse;
  }

  private responseDeErro(error: any): AlteracaoResponse {
    const alteracaoResponse = new AlteracaoResponse();
    alteracaoResponse.sucesso = false;
    alteracaoResponse.opcoesDeDialogo = new OpcoesDeDialogo(
      'Conflito de horário',
      error.response.data.mensagemDeConflito,
      'OK',
      '',
    );
    return alteracaoResponse;
  }
}
