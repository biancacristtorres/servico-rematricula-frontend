import { Horario } from '@/model/Horario';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';

export class DadoUmResumoContendoDisciplinaPorData  extends HttpService {

  private response: any;

  public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = {status: 200 };

    const horarioA = new Horario();
    horarioA.horaInicioFim = '09:00 - 10:00';

    const disciplinaResumo = new DisciplinaResumo();
    disciplinaResumo.codigoDisciplina = 2;
    disciplinaResumo.datas = ['01/01/2018', '03/02/2018'];
    disciplinaResumo.ePorData = true;

    horarioA.disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemana();
    horarioA.disciplinasPorDiaDeSemana[2] = [disciplinaResumo];

    this.response.data = {horarios: new Array<Horario>(horarioA) };

    return new Promise((resolve) => resolve(this.response));

  }
}
