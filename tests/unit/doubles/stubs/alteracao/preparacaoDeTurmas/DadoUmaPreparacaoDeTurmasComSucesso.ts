import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmaPreparacaoDeTurmasComSucesso extends HttpService {
  private response: any;

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {
      status: 200,
      data: {
        horarios: [{
            horaInicio: '20:55h',
            disciplinasPorDiaDeSemana: {
              2: [{
                  codigoDisciplina: 143924,
                  nomeDisciplina:  'Cálculo I',
                },
              ],
              5: [{
                  codigoDisciplina: 143924,
                  nomeDisciplina:  'Cálculo I',
                },
              ],
            },
          },
        ],
      },
    };

    return new Promise((resolve) => resolve(this.response));
  }
}
