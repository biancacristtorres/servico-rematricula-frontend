import {
  SalvarAlteracoesServiceFactory,
} from '../../../factory/services/alteracao/SalvarAlteracoesServiceFactory';


describe('service > SalvarAlteracoesService', () => {
  const factory = new SalvarAlteracoesServiceFactory();

  beforeEach(() => {
    factory.espionarAPI();
    factory.setarVariavelAmbiente('VUE_APP_API_COMPRAONLINE', '');
  });

  afterEach(() => {
    factory.restaurarEstadoInicialDoTeste();
  });

  it('Salva uma alteração com sucesso', async (done) => {
    factory.dadoQueApiRetorneStatusDeSucesso();
    const codigoDoAluno = 1441204;

    const response = await factory.servico.processar(codigoDoAluno);

    expect(response.status).toEqual(200);
    expect(factory.espiao).toBeCalledWith(`/api/Matricula/${ codigoDoAluno }`);
    expect(factory.espiao).toHaveBeenCalledTimes(1);

    done();
  });
});
