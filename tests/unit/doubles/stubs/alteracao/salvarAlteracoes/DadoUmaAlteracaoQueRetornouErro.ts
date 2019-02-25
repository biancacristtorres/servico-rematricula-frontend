import { HttpService } from 'componente-frontend-core/services/HttpService';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { TipoErroSalvarAlteracao } from '@/common/enum/TipoErroSalvarAlteracao';

export class DadoUmaAlteracaoQueRetornouErro extends HttpService {
  private response: any;

  public post<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {

    this.response = {
      status: 409,
      response: {
        data:  TipoErroSalvarAlteracao.MINIMO_3_DISCIPLINAS,
      },
    };

    return new Promise((resolve, reject) => reject(this.response));
  }

}
