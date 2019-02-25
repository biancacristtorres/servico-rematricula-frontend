import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class AssinaturaDeContratoComExcecao extends HttpService {
  private response: any;

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {};

    return new Promise((resolve, reject) => reject(this.response));
  }

}
