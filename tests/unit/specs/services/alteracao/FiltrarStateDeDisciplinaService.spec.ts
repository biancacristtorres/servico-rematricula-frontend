import {
  FiltrarStateDeDisciplinaServiceFactory,
} from '../../../factory/services/alteracao/FiltrarStateDeDisciplinaServiceFactory';

describe('service > FiltrarStateDeDisciplinaService ', () => {
  const factory = new FiltrarStateDeDisciplinaServiceFactory();

  it('Recuperar uma disciplina do state com sucesso', async (done) => {
    factory.dadoQueCalculoIEstaNoStateDeAlteracao();

    const disciplina = factory.servico.processar(factory.state.disciplinas, factory.codigoDeCalculo1);

    expect(disciplina).toEqual(factory.calculoI);
    done();
  });

  it('Levanta exceção quando não encontra uma disciplina', async (done) => {
    factory.dadoUmStateSemDisciplinas();

    expect(() => {
      factory.servico.processar(factory.state.disciplinas, factory.codigoDeCalculo1);
    }).toThrow();
    done();
  });

});
