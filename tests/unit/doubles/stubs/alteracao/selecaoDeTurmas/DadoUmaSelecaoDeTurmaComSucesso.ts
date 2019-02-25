import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmaSelecaoDeTurmaComSucesso extends HttpService {
  private response: any;
  private dataSended: any;

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.sendData(data);

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

  public sendData(data?: any) {
    this.dataSended = data;
  }

}
