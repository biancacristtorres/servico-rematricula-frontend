import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialApiStub extends HttpService {
  private response!: any;

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    this.dadoUmResponseComTurmasEspeciais();
    return new Promise((resolve) => resolve(this.response));
  }

  private dadoUmResponseComTurmasEspeciais(): void {
    this.response = {
      data: {
        condicoesEspeciais: [CondicaoEspecial.TurmasEspecias],
      },
    };
  }

}
