import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class DadoUmaRemocaoDeTurmaComErro extends HttpService {
  private response: any;

  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this.response = { status: 404 };

    return new Promise((resolve, reject) => reject(this.response));
  }

}
