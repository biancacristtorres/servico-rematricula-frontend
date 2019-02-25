import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Inject } from 'typescript-ioc';
import { ServiceBase } from './ServiceBase';

export class ObterAcessoAoFreshDeskService extends ServiceBase {
  protected urlBase: string = '/api/ObterAcessoAoFreshDesk';

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: number): Promise<string> {
    const url = `${ this.urlBase }?codigoAluno=${ codigoDoAluno }`;

    const response = await this.http.get(url);

    return response.data;
  }

}
