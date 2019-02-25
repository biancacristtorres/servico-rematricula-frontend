import { Inject } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Horario } from '@/model/Horario';
import { ServiceBase } from '../ServiceBase';
import { DisciplinaSemHorario } from '@/model/DisciplinaSemHorario';

export class ResumoService extends ServiceBase {
  protected urlBase: string = `${process.env.VUE_APP_API_URL}`;

  constructor(@Inject http: HttpService) {
    super(http);
  }

  public async obterResumo(codigoDoAluno: number): Promise<Horario[]> {
    const url = `${this.urlBase}/api/resumo?codigoAluno=${codigoDoAluno}`;

    const response = await this.http.get(url);
    return response.data.horarios;
  }

  public async obterDisciplinasSemHorario(codigoDoAluno: number): Promise<DisciplinaSemHorario[]> {
    const url = `${this.urlBase}/api/resumo/DisciplinasSemHorario?codigoAluno=${codigoDoAluno}`;

    const response = await this.http.get(url);
    return response.data;
  }
}
