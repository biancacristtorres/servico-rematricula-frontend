import {
  TurmasEspeciaisServiceFactory,
} from '../../../factory/services/alteracao/TurmasEspeciaisServiceFactory';

describe('serives > alteracao > Serviço de turmas especias', () => {
  const factory = new TurmasEspeciaisServiceFactory();

  it('Obtém turmas especiais com sucesso', async (done) => {
    factory.dadoQueApiRetorneUmaTurmaEspecialComComposicao();
    const codigoDaDisciplina = 3712;
    const codigoDoAluno = 1421;

    const atual = await factory.servico.obterPor(codigoDaDisciplina, codigoDoAluno);

    const esperado = [ factory.turmaEspecialComComposicao ];
    expect(atual).toEqual(esperado);
    done();
  });

});
