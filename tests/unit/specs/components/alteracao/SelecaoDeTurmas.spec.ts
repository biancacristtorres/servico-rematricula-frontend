import {
  SelecaoDeTurmasFactory,
} from '../../../factory/components/alteracao/SelecaoDeTurmasFactory';
import store, { StoreNamespaces } from '@/store';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';

describe('Componente de Seleção de Turmas', () => {
  const factory = new SelecaoDeTurmasFactory();

  beforeEach(async (done) => {
    factory.dadoQueAStoreDeAlteracaoPossuaCalculoI();
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueONovoSelecionadorEstaDesabilitado();

    await factory.montarComponente();

    done();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('Carrega os dados de disciplina da store de alteração corretamente', () => {
    expect(factory.vueInstance.disciplina.codigo).toEqual(factory.codigoCalculoI);
  });

  it('Carrega os dados de turma da disciplina corretamente', () => {
    expect(factory.vueInstance.disciplina.turmas).toContainEqual(factory.turma);
  });

  it('Carrega os dados de turma equivalente da disciplina corretamente', () => {
    expect(factory.vueInstance.disciplina.turmasEquivalentes).toContainEqual(factory.turmaEquivalente);
  });

  it('Ao final da montagem, o componente está pronto para exibição', () => {
    expect(factory.vueInstance.prontoParaExibicao).toBeTruthy();
  });

  it('Escuta um evento de alteração de turma, faz um PUT e seleciona a turma', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerPUT();
    factory.dadoQueExistaUmAlunoNaStore();

    factory.turmaRenderizada().trigger('click');
    await factory.aguardarRenderizacao();

    const estaSelecionada = factory.estaSelecionada(factory.turmaRenderizada());
    expect(estaSelecionada).toBeTruthy();
    done();
  });

  it('Escuta um evento de alteração de turma equivalente, faz um PUT e seleciona a turma equivalente', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerPUT();
    factory.dadoQueExistaUmAlunoNaStore();

    factory.turmaEquivalenteRenderizada().trigger('click');
    await factory.aguardarRenderizacao();

    const estaSelecionada = factory.estaSelecionada(factory.turmaEquivalenteRenderizada());
    expect(estaSelecionada).toBeTruthy();
    done();
  });

  it('Ao alterar um turma, a mini grade é recarregada', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerPUT();
    factory.dadoQueExistaUmAlunoNaStore();

    factory.turmaRenderizada().trigger('click');
    await factory.aguardarRenderizacao();

    expect(factory.stateDaMiniGrade.horarios).toContainEqual(factory.horarioDaMiniGradeEsperado);
    done();
  });

  it('Escuta um evento de remoção de turma, faz um Delete e nenhuma opção é selecionada', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerDelete();

    const nenhumaOpcao = factory.componente.find(`#nenhuma-opcao-${ factory.codigoCalculoI }`);
    nenhumaOpcao.trigger('click');

    expect(factory.estaSelecionada(nenhumaOpcao)).toBeTruthy();
    done();
  });

  it('Ao remover um turma, a mini grade é recarregada', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerDelete();

    factory.nenhumaOpcaoRenderizada().trigger('click');
    await factory.aguardarRenderizacao();

    expect(factory.stateDaMiniGrade.horarios).toContainEqual(factory.horarioDaMiniGradeEsperado);
    done();
  });

  it('Quando um evento de remoção falhar, um feedback é exibido e nenhuma opção não é selecionada', async (done) => {
    factory.dadoQueApiRetorneErroAoFazerDelete();

    factory.nenhumaOpcaoRenderizada().trigger('click');

    await factory.aguardarRenderizacao();

    expect(factory.vueInstance.$dialogo.instance).not.toBeUndefined();
    expect(factory.estaSelecionada(factory.nenhumaOpcaoRenderizada())).toBeTruthy();
    done();
  });

  it('Alterna estado de loading ao selecionar uma turma', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerPUT();

    factory.turmaRenderizada().trigger('click');
    expect(factory.estaCarregando()).toBeTruthy();

    await factory.aguardarRenderizacao();
    expect(factory.estaCarregando()).toBeFalsy();
    done();
  });

  it('Alterna estado de loading ao remover uma turma', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerDelete();

    factory.nenhumaOpcaoRenderizada().trigger('click');
    expect(factory.estaCarregando()).toBeTruthy();

    await factory.aguardarRenderizacao();
    expect(factory.estaCarregando()).toBeFalsy();
    done();
  });

  it('Ao fazer uma seleção de turma, deve informar que houve alteração', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucessoAoFazerPUT();

    factory.turmaRenderizada().trigger('click');

    const atual = store.getters[
      `${ StoreNamespaces.ALTERACAO }/${ AlteracaoGetterTypes.POSSUI_ALTERACAO }`
    ];
    expect(atual).toBeTruthy();
    done();
  });

  it('Snapshot', () => {
    expect(factory.componente).toMatchSnapshot();
  });
});
