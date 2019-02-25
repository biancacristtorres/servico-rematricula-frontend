import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class AssinaturaDeContratoComSucesso extends HttpService {
  private response: any;

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {
      data: {
        contratoFoiAssinado: true,
      },
    };

    return new Promise((resolve) => resolve(this.response));
  }

}
