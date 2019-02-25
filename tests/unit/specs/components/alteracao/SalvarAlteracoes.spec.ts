import {
  SalvarAlteracoesFactory,
} from '../../../factory/components/alteracao/SalvarAlteracoesFactory';

describe('Componente de Salvar Alterações', () => {
  const factory = new SalvarAlteracoesFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueExistemDisciplinasDisponiveis();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
    factory.destruirDialogo();
  });

  it('Salva alterações com sucesso', async (done) => {
    factory.dadoQueAsAlteracoesForamSalvasComSucesso();

    await factory.montarComponente();
    await factory.salvarAlteracoes();

    expect(factory.oDialogoEstaAberto()).toBeTruthy();
    done();
  });

  it('Ao confirmar feedback de alterção feita com sucesso, é redirecionado para o Resumo', async (done) => {
    factory.dadoQueAsAlteracoesForamSalvasComSucesso();

    await factory.montarComponente();
    await factory.salvarAlteracoes();
    factory.dialogo.find('#confirmar').trigger('click');

    expect(factory.redirecionamento).toBeCalledWith('/Resumo');
    done();
  });

  it('Exibe feedback quando não é possível salvar alterações', async (done) => {
    factory.dadoQueOcorreuErroAoSalvarAlteracoes();

    await factory.montarComponente();
    await factory.salvarAlteracoes();

    expect(factory.oDialogoEstaAberto()).toBeTruthy();
    done();
  });

  it('O botão de salvar está em estado de loading', async (done) => {
    factory.dadoQueEstaAcontecendoUmaAlteracaoDeTurma();

    await factory.montarComponente();

    expect(factory.oBotaoSalvarEstaEmLoading()).toBeTruthy();
    done();
  });

  it('O botão de salvar não está em estado de loading', async (done) => {
    factory.dadoQueNaoEstaAcontecendoUmaAlteracaoDeTurma();

    await factory.montarComponente();

    expect(factory.oBotaoSalvarEstaEmLoading()).toBeFalsy();
    done();
  });

});
