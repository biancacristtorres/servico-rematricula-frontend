import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { DisciplinaSemHorarioBuilder } from '../../../builders/DisciplinaSemHorarioBuilder';
import { DisciplinaSemHorario } from '@/model/DisciplinaSemHorario';

export class DadoUmaListaDeDisciplinasSemHorarioComDisciplinaEquivalente extends HttpService {

  private response: any;

  public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = { status: 200 };

    const disciplina = DisciplinaSemHorarioBuilder
      .dadosAsOpcoes()
      .comDisciplinaEquivalente()
      .opcoes;

    this.response.data = new Array<DisciplinaSemHorario>(disciplina);

    return new Promise((resolve) => resolve(this.response));
  }
}
