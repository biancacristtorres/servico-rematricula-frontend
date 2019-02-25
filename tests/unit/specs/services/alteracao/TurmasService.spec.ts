import {
  TurmaServiceFactory,
} from '../../../factory/services/alteracao/TurmaServiceFactory';

describe('service > TurmaPorDisciplinaService', () => {
  const factory = new TurmaServiceFactory();

  it('Obtém as turmas para uma disciplina e um aluno', async (done) => {
    factory.dadoQueApiRetorneDuasTurmas();

    const atual = await factory.servico
      .obterPor(factory.umaDisciplinaQualquer, factory.umAlunoQualquer);

    const esperado = [factory.turmaSelecionada, factory.turmaNaoSelecionada];
    expect(atual).toEqual(esperado);

    done();
  });

  it('Obtém as turmas compostas para uma disciplina e um aluno', async (done) => {
    factory.dadoQueApiRetorneDuasTurmasComComposicao();

    const atual = await factory.servico
      .obterPor(factory.umaDisciplinaQualquer, factory.umAlunoQualquer);

    const esperado = [
      factory.turmaSelecionadaComComplementar, factory.turmaNaoSelecionadaComComplementar,
    ];
    expect(atual).toEqual(esperado);

    done();
  });

});
