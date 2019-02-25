import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { SelecaoDeTurmaRequest } from './request/SelecaoDeTurmaRequest';
import { AxiosResponse } from 'axios';

export class SelecaoDeTurmaService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processsar(request: SelecaoDeTurmaRequest, codigoDoAluno: number): Promise<AxiosResponse<any>> {
    const url = `${this.urlBase}/api/Matricula/${codigoDoAluno}`;

    const response = await this.http.put(url, request);

    return response;
  }

}
