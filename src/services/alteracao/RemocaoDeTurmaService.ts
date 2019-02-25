import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosResponse } from 'axios';

export class RemocaoDeTurmaService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_COMPRAONLINE}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async processar(codigoDaDisciplina: number, codigoDoAluno: number): Promise<AxiosResponse<any>> {
    const url = `${ this.urlBase }/api/Matricula/${ codigoDoAluno }/Disciplina/${codigoDaDisciplina}`;

    const response = await this.http.delete(url);

    return response;
  }
}
