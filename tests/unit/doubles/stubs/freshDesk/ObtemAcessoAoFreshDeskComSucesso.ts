import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';

export class ObtemAcessoAoFreshDeskComSucesso extends HttpService {
  private response: any;

  public get<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.response = {
      data: 'https://daniloreis.freshdesk.com/login/sso?nome=xpto&email=xpto&#64;gmail.com',
    };

    return new Promise((resolve) => resolve(this.response));
  }

}
