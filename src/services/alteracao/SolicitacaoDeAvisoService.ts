import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { SelecaoDeTurmaRequest } from './request/SelecaoDeTurmaRequest';

export class SolicitacaoDeAvisoService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(request: SelecaoDeTurmaRequest, codigoDoAluno: number): Promise<void> {
    const url = `${this.urlBase}/api/Matricula/${codigoDoAluno}/Interesse`;

    await this.http.post(url, request);
  }
}
