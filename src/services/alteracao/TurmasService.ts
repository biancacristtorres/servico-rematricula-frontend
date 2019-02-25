import { ServiceBase } from '../ServiceBase';
import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Turma } from '@/model/Turma';

export class TurmasService extends ServiceBase {
  protected urlBase: string = '/api/Disciplinas';

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async obterPor(codigoDaDisciplina: number, codigoDoAluno: number): Promise<Turma[]> {
    const response = await this.http.get(
      `${this.urlBase}/${codigoDaDisciplina}/TurmasDisciplina?codigoDoAluno=${codigoDoAluno}`,
    );

    return response.data;
  }
}
