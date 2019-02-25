import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';

export class BaixarContratoService extends ServiceBase {
  protected urlBase: string = '/api/ObterArquivoContrato';

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: any): Promise<string> {
    const url = `${ this.urlBase }?codigoAluno=${ codigoDoAluno }`;

    const response = await this.http.get(url, {
      responseType: 'arraybuffer',
      timeout: 120000,
    });

    const blob = this.criarBlob(response);

    return URL.createObjectURL(blob);
  }

  public criarBlob(response: any): Blob {
    return new Blob([response.data], {
      type: 'application/pdf',
    });
  }

}
