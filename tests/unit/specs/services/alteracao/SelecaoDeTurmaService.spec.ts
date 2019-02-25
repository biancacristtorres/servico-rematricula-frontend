import {
  SelecaoDeTurmaServiceFactory,
} from '../../../factory/services/alteracao/SelecaoDeTurmaServiceFactory';

describe('service > SelecaoDeTurmaService', () => {

  const factory = new SelecaoDeTurmaServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Selecionar turmas com sucesso', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucesso();

    const request = factory.dadoUmRequestDeSelecaoDeTurma();
    const response = await factory.servico.processsar(request, 1);

    expect(response.status).toEqual(200);
    expect(factory.espiao).toBeCalledWith(request);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });
});
