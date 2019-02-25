import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { HttpService } from 'componente-frontend-core/services/HttpService';

export class DadoUmaSolicitacaoComSucesso extends HttpService {
  private response: any;
  private dataSended: any;

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.sendData(data);

    this.response = {
      status: 200,
    };

    return new Promise((resolve) => resolve(this.response));
  }

  public sendData(data?: any) {
    this.dataSended = data;
  }

}
