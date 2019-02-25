import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';


export class SalvarAlteracoesService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: number): Promise<any> {

    const url = `${ this.urlBase }/api/Matricula/${ codigoDoAluno }`;
    const response = await this.http.post(url);
    return response;
  }
}
