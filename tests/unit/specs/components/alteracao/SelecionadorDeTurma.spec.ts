import {
  SelecionadorDeTurmaFactory,
} from '../../../factory/components/alteracao/SelecionadorDeTurmaFactory';
import store, { StoreNamespaces } from '@/store';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { MiniGradeGetterTypes } from '@/store/miniGrade/getters';

describe('Componente de Alteração de Matrícula', () => {
  const factory = new SelecionadorDeTurmaFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueExistaUmAlunoNaStore();
    factory.dadoQueNaoExisteUmLoading();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
    factory.destruirDialogo();
  });

  it('Um diálogo é exibido quando uma alteração de turma falha', async (done) => {
    factory.dadoUmaTurmaAtual();
    factory.dadoQueUmCancelamentoDeMatriculaVenhaAFalhar();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    expect(factory.oDialogoEstaAberto()).toBeTruthy();
    done();
  });

  it('Uma alteração de turma com sucesso não possui feedback de diálogo', async (done) => {
    factory.dadoUmaTurmaAtual();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    expect(factory.oDialogoEstaAberto()).toBeFalsy();
    done();
  });

  it('Uma alteração de turma com sucesso deve informar que houve alteração', async (done) => {
    factory.dadoUmaTurmaQueNaoEAtualComPeriodicidadeSemestral();
    factory.dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    const atual = store.getters[
      `${ StoreNamespaces.ALTERACAO }/${ AlteracaoGetterTypes.POSSUI_ALTERACAO }`
    ];
    expect(atual).toBeTruthy();
    done();
  });

  it('Uma alteração de turma com sucesso deve alterar a turma atual', async (done) => {
    factory.dadoUmaTurmaQueNaoEAtualComPeriodicidadeSemestral();
    factory.dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    const calculoIntegral = store.getters[
      `${ StoreNamespaces.ALTERACAO }/${ AlteracaoGetterTypes.DISCIPLINA }`
    ] (factory.turmaEmContexto.codigoDaDisciplina);

    expect(calculoIntegral.turmas[0].eTurmaAtual).toBeTruthy();
    done();
  });

  it('Alterna estado de loading ao selecionar uma turma', async (done) => {
    factory.dadoUmaTurmaAtual();
    factory.dadoQueUmCancelamentoDeMatriculaVenhaAFalhar();

    await factory.montarComponente();
    factory.clicarNaTurma();

    expect(factory.estaCarregando()).toBeTruthy();
    await factory.aguardarRenderizacao();
    expect(factory.estaCarregando()).toBeFalsy();
    done();
  });

  it('Uma alteração de turma com sucesso deve carregar a minigrade', async (done) => {
    factory.dadoUmaTurmaQueNaoEAtualComPeriodicidadeSemestral();
    factory.dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    const horariosMiniGrade = store.getters[
      `${ StoreNamespaces.MINI_GRADE }/${ MiniGradeGetterTypes.MINI_GRADE }`
    ];
    const esperado = 1;
    const atual = horariosMiniGrade.length;
    expect(atual).toBe(esperado);

    done();
  });

  it.skip('Uma alteração de aluno anual para turma semestral deve abrir alerta', async (done) => {
    factory.dadoUmaTurmaQueNaoEAtualComPeriodicidadeSemestral();
    factory.dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto();
    factory.dadoQueExistaUmAlunoSaoJudasComPeriodicidadeAnualNaStore();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    expect(factory.oDialogoEstaAberto()).toBeTruthy();
    done();
  });

  it.skip('Uma alteração de aluno anual para turma anual não deve abrir alerta', async (done) => {
    factory.dadoUmaTurmaQueNaoEAtualComPeriodicidadeAnual();
    factory.dadoQueCalculoIntegralEstejaNaStoreComATurmaEmContexto();
    factory.dadoQueExistaUmAlunoSaoJudasComPeriodicidadeAnualNaStore();
    factory.dadoQueUmaMatriculaOcorraComSucesso();

    await factory.montarComponente();
    await factory.clicarNaTurmaEAguardar();

    expect(factory.oDialogoEstaAberto()).toBeFalsy();
    done();
  });
});
