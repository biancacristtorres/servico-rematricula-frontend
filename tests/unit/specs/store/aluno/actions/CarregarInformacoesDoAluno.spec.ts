import store, { StoreNamespaces } from '@/store';
import { Container } from 'typescript-ioc';
import { AlunoService } from '@/services/AlunoService';
import { AlunoServiceStub } from '../../../../doubles/stubs/aluno/AlunoServiceStub';
import { AlunoActionTypes } from '@/store/aluno/actions';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { AlunoGetterTypes } from '@/store/aluno/getters';

describe('store > Aluno', () => {
  const obterInformacoesAlunoAction =
    `${StoreNamespaces.ALUNO}/${AlunoActionTypes.OBTER_INFORMACOES_ALUNO}`;

  const obtendoInformacoesAlunoAction =
    `${StoreNamespaces.ALUNO}/${AlunoActionTypes.OBTENDO_INFORMACOES_ALUNO}`;

  const informacoesAlunoObtidasAction =
    `${StoreNamespaces.ALUNO}/${AlunoActionTypes.INFORMACOES_ALUNO_OBTIDAS}`;

  const limparInformacoesAlunoAction =
    `${StoreNamespaces.ALUNO}/${AlunoActionTypes.LIMPAR_INFORMACOES_ALUNO}`;

  const informacoesDoAlunoGetter =
    `${StoreNamespaces.ALUNO}/${AlunoGetterTypes.INFORMACOES_ALUNO}`;

  const estaObtendoInformacoesDoAlunoGetter =
    `${StoreNamespaces.ALUNO}/${AlunoGetterTypes.ESTA_OBTENDO_INFORMACOES_ALUNO }`;

  beforeAll(() => {
    Container.bind(AlunoService).to(AlunoServiceStub);
  });

  it('Carrega o Aluno na store', async (done) => {
    const codigoDoAluno = 123;

    await store.dispatch(obterInformacoesAlunoAction, codigoDoAluno);

    const informacoesAluno = store.getters[informacoesDoAlunoGetter];

    expect(informacoesAluno).toBeInstanceOf(InformacoesAluno);
    done();
  });

  it('Limpar informações do Aluno', async (done) => {
    await store.dispatch(limparInformacoesAlunoAction);

    const informacoesAluno = store.getters[informacoesDoAlunoGetter];

    expect(informacoesAluno).toBeUndefined();
    done();
  });

  it('Informa o carragamento das informações do aluno', async (done) => {
    await store.dispatch(obtendoInformacoesAlunoAction);

    const atual = store.getters[estaObtendoInformacoesDoAlunoGetter];

    expect(atual).toBeTruthy();
    done();
  });

  it('Informa que as informações do aluno estão prontas', async (done) => {
    await store.dispatch(informacoesAlunoObtidasAction);

    const atual = store.getters[estaObtendoInformacoesDoAlunoGetter];

    expect(atual).toBeFalsy();
    done();
  });

  afterAll(() => {
    Container.restore(AlunoService);
  });

});
