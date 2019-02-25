import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoServiceFactory } from '../../factory/services/AlunoServiceFactory';
import store, { StoreNamespaces } from '@/store';
import { AlunoActionTypes } from '@/store/aluno/actions';

describe('service > AlunoService', () => {
  const factory = new AlunoServiceFactory();

  const ObterInformacoesAlunoAction = `${StoreNamespaces.ALUNO}/${AlunoActionTypes.OBTER_INFORMACOES_ALUNO}`;


  it('Obter Informacoes Aluno', async (done) => {
    factory.DadoUmaRequisicaoComSucesso();

    const response = await factory.servico.obterInformacoesAluno(123);

    expect(response).toBeInstanceOf(InformacoesAluno);

    done();
  });
});
