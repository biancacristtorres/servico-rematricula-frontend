import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { HorarioModelBuilder } from '../../../builders/HorarioModelBuilder';
import { Horario } from '@/model/Horario';

export class DadoUmResumoContendoDisciplinaComTurmaEspecial extends HttpService {

  private response: any;

  public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = { status: 200 };

    const horario = HorarioModelBuilder
      .dadosAsOpcoes()
      .comDisciplinaReservada()
      .opcoes;

    this.response.data = { horarios: new Array<Horario>(horario) };

    return new Promise((resolve) => resolve(this.response));
  }
}
