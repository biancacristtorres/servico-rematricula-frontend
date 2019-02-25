import {
  SolicitacaoDeAvisoServiceFactory,
} from '../../../factory/services/alteracao/SolicitacaoDeAvisoServiceFactory';

describe('servico > alteracao > Servico de solicitação de aviso', () => {
  const factory = new SolicitacaoDeAvisoServiceFactory();

  beforeEach(() => {
    factory.espionarApi();
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Solicita um aviso com sucesso', async (done) => {
    factory.dadoQueOAvisoFoiSolicitadoComSucesso();
    const request = factory.dadoUmRequestDeSelecaoDeTurma();
    const codigoDoAluno = 1;

    await factory.servico.processar(request, codigoDoAluno);

    expect(factory.espiao).toBeCalledWith(request);
    expect(factory.espiao).toHaveBeenCalledTimes(1);
    done();
  });

});
