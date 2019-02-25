import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosResponse } from 'axios';

export class AcessarAlteracaoService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: number): Promise<AxiosResponse> {
    const url = `${ this.urlBase }/api/Matricula/${ codigoDoAluno }/Status`;

    const response = await this.http.get(url);
    return response;
  }

}
