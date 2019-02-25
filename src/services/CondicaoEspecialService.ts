import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Inject } from 'typescript-ioc';
import { CondicaoEspecial } from '@/common/enum/CondicaoEspecial';

export class CondicaoEspecialService {
  private http!: HttpService;
  private urlBase!: string;

  constructor(@Inject http: HttpService) {
    this.http = http;
    this.urlBase = `${process.env.VUE_APP_API_INTERESSE}/api/condicoesEspeciais`;
  }

  public async solicitadasPor(codigoDoAluno: number): Promise<CondicaoEspecial[]> {
    const response = await this.http
      .get(`${this.urlBase}?codigoAluno=${codigoDoAluno}`);

    return response.data.condicoesEspeciais;
  }

  public async solicitar(codigoDoAluno: number, condicoesEspeciais: CondicaoEspecial[]): Promise<void> {
    this.http
      .post<CondicaoEspecial[]>(this.urlBase, { codigoDoAluno, condicoesEspeciais })
      .then();
  }

}
