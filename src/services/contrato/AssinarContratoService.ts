import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Inject } from 'typescript-ioc';
import { ServiceBase } from '../ServiceBase';

export class AssinarContratoService extends ServiceBase {
  protected urlBase: string = '/api/AssinarContrato';

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: number): Promise<boolean> {
    const url = `${ this.urlBase }?codigoAluno=${ codigoDoAluno }`;

    const response = await this.http.patch(url);

    return response.data.contratoFoiAssinado;
  }

}
