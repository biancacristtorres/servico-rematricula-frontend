import { InformacoesAluno } from '@/model/InformacoesAluno';
import { StubBase } from '../StubBase';

export class DadoUmaRequisicaoComSucesso extends StubBase {
  protected dadoUmResponse(): any {
    const response = new InformacoesAluno();
    response.codigoAluno = 123;
    return response;
  }
}
