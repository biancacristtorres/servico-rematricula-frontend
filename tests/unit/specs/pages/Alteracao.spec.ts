import { AlteracaoFactory } from '../../factory/pages/AlteracaoFactory';
import store, { StoreNamespaces } from '@/store';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

describe('Página de Interesse', () => {
  const factory = new AlteracaoFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueApiRetorneStatusDeSucesso();
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('Ao criar a página de alteração dispara um request de preparação de turmas', async (done) => {
    await factory.montarComponente();

    expect(factory.espiao).toHaveBeenCalledTimes(1);
    done();
  });

  it('Ao criar o componente, o estado de loading é alternado', async (done) => {
    await factory.montarComponente();

    expect(factory.preparandoTurmas).toBeCalled();
    expect(factory.preparacaoFinalizada).toBeCalled();
    done();
  });

  it('O link para voltar de Alterção é o Resumo', async (done) => {
    await factory.montarComponente();

    expect(factory.linkParaVoltar()).toEqual('/Resumo');
    done();
  });

  it('Ao preparar turmas com sucesso, a store de mini grade é carregada', async (done) => {
    await factory.montarComponente();

    expect(factory.stateDaMiniGrade.horarios).toContainEqual(factory.horarioDaMiniGradeEsperado);
    done();
  });

  it('Ao criar componente, limpa as alterações', async (done) => {
    store.dispatch(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoActionTypes.INFORMAR_ALTERACAO }`);

    await factory.montarComponente();

    const atual = store.getters[
      `${ StoreNamespaces.ALTERACAO }/${ AlteracaoGetterTypes.POSSUI_ALTERACAO }`
    ];
    expect(atual).toBeFalsy();
    done();
  });

  it('Quando a feature de filtro está desabilitada, o componente de filtro não é renderizado', async (done) => {
    factory.dadoAToggleDeFiltroDesabilitada();

    await factory.montarComponente();

    const existeFiltroDeTurmas = factory.componente.find('#filtro-de-turmas').exists();
    expect(existeFiltroDeTurmas).toBeFalsy();
    done();
  });

  it('Quando a feature de filtro está habilitada, o componente de filtro é renderizado', async (done) => {
    factory.dadoAToggleDeFiltroHabilitada();

    await factory.montarComponente();

    const existeFiltroDeTurmas = factory.componente.find('#filtro-de-turmas').exists();
    expect(existeFiltroDeTurmas).toBeTruthy();
    done();
  });

  it('snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();
    done();
  });

});
