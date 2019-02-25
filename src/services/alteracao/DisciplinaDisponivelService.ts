import { Disciplina } from '@/model/Disciplina';
import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';

export class DisciplinaDisponivelService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_URL}/api/disciplinasDisponiveis`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async obter(codigoDoAluno: number): Promise<Disciplina[]> {
    const response = await this.http.get(`${this.urlBase}?codigoAluno=${codigoDoAluno}`);
    return response.data;
  }
}
