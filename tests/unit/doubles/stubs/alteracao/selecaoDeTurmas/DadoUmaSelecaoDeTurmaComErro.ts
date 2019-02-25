import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmaSelecaoDeTurmaComErro extends HttpService {
  private response: any;

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {
      status: 409,
      response: {
        data: {
          mensagemDeConflito: 'Ocorreu um conflito',
        },
      },
    };

    return new Promise((resolve, reject) => reject(this.response));
  }

}
