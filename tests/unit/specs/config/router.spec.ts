import beforeEach from '@/config/router/beforeEach';
import store, { StoreNamespaces } from '@/store';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';
import { RotasSemValidacao } from '@/config/router/RotasSemValidacao';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { InformacoesAlunoStub } from '../../doubles/stubs/aluno/InformacoesAlunoStub';
import { InformacoesAluno } from '@/model/InformacoesAluno';

const informacoesAlunoStub = new InformacoesAlunoStub();

const setTokenMutation = `${StoreNamespaces.AUTORIZACAO}/${AutorizacaoMutationTypes.SET_TOKEN}`;
const setInformacoesAluno = `${StoreNamespaces.ALUNO}/${AlunoMutationTypes.SET_INFORMACOES_ALUNO}`;

const rotaComValidacao = { path : '/Alteracao' };
const rotaSemValidacao = { path : RotasSemValidacao.Interesse };
const rotaInicial = { path : RotasSemValidacao.Inicio };

describe('router > beforeEach', () => {

  it('Uma pessoa não autenticada é redirecionada para a página de login', async (done) => {
    const nextMock = (urlRedirecionada: string) => {
      expect(urlRedirecionada).toEqual(RotasSemValidacao.login);
      done();
    };

    beforeEach(rotaComValidacao, rotaInicial, nextMock);
  });


  it('Um aluno autenticado é redirecionado para a URL requisitada que não possui validacao', async (done) => {
    store.commit(setTokenMutation, 'token');
    store.commit(setInformacoesAluno, informacoesAlunoStub.alunoComPendenciaAcademica());

    const informacoesDoAluno = informacoesAlunoStub.alunoComPendenciaAcademica();

    testarRedirect(informacoesDoAluno, rotaSemValidacao, undefined, done);
  });

  it('Um aluno autenticado e sem pendência é redirecionado para a URL requisitada com validação', async (done) => {
    store.commit(setTokenMutation, 'token');
    store.commit(setInformacoesAluno, informacoesAlunoStub.alunoSemPendencias());

    const informacoesDoAluno = informacoesAlunoStub.alunoSemPendencias();

    testarRedirect(informacoesDoAluno, rotaComValidacao, undefined, done);
  });

  it('Redireciona aluno com pendencia de documentacão para a tela de erro de pendencia acadêmica', async (done) => {
    const informacoesDoAluno = informacoesAlunoStub.alunoComPendenciaAcademica();
    const rotaEsperada = RotasSemValidacao.PendenciaAcademica;

    testarRedirect(informacoesDoAluno, rotaComValidacao, rotaEsperada, done);
  });

  it('Redireciona aluno com pendencia de financeira para a tela de erro de pendencia financeira', async (done) => {
    const informacoesDoAluno = informacoesAlunoStub.alunoComPendenciaFinanceira();
    const rotaEsperada = RotasSemValidacao.PendenciaFinanceira;

    testarRedirect(informacoesDoAluno, rotaComValidacao, rotaEsperada, done);
  });

  it('Redireciona aluno com contrato não assinado para a tela de assinar contrato', async (done) => {
    const informacoesDoAluno = informacoesAlunoStub.alunoSemContratoAssinado();
    const rotaEsperada = RotasSemValidacao.Contrato;

    testarRedirect(informacoesDoAluno, rotaComValidacao, rotaEsperada, done);
  });
});

function testarRedirect(
  informacoesDoAluno: InformacoesAluno,
  rotaDirecionada: any,
  rotaEsperada: string | undefined,
  done: jest.DoneCallback) {
  store.commit(setTokenMutation, 'token');
  store.commit(setInformacoesAluno, informacoesDoAluno);
  const nextMock = (urlRedirecionada: string) => {
    expect(urlRedirecionada).toEqual(rotaEsperada);
    done();
  };
  beforeEach(rotaDirecionada, rotaInicial, nextMock);
}
