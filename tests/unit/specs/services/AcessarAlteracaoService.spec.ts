import {
  AcessarAlteracaoServiceFactory,
} from '../../factory/services/AcessarAlteracaoServiceFactory';

describe('service > AcessarAlteracaoService', () => {
  const factory = new AcessarAlteracaoServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.setarVariavelAmbiente('VUE_APP_API_COMPRAONLINE', '');
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('API retorna', async (done) => {
    factory.dadoQueAAPIRetorneComSucesso();

    const response = await factory.servico.processar(2);

    expect(response.data.statusEstaLiberadoParaAlteracao).toBeTruthy();

    done();
  });
});
