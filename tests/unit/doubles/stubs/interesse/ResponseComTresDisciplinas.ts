import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { DisciplinaComInteresse } from '@/model/DisciplinaComInteresse';

export class ResponseComTresDisciplinas extends HttpService {

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return new Promise((resolve) => resolve(this.dadoUmResponseComTresDisciplinas));
  }

  private get dadoUmResponseComTresDisciplinas(): any {
    const calculoI = new DisciplinaComInteresse(1, 'Cálculo I', false);
    const fisicaII = new DisciplinaComInteresse(2, 'Física II', true);
    const algebraI = new DisciplinaComInteresse(3, 'Algebra I', false);

    const disciplinas = new Array<DisciplinaComInteresse>(calculoI, fisicaII, algebraI);

    return {
      data:
        {
          disciplinasPendentes: disciplinas,
        },
    };
  }

}
