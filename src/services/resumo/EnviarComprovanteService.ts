import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';

export class EnviarComprovanteService extends ServiceBase {
    protected urlBase: string = `${process.env.VUE_APP_API_URL}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDoAluno: number): Promise<void> {
    const url = `${this.urlBase}/api/ComprovanteMatricula?codigoAluno=${codigoDoAluno}`;

    await this.http.post(url, { codigoDoAluno });
  }
}
