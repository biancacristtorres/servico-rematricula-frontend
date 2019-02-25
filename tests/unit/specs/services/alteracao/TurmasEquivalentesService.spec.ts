import {
  TurmasEquivalentesServiceFactory,
} from '../../../factory/services/alteracao/TurmasEquivalentesServiceFactory';
import { Turma } from '@/model/Turma';
import { TurmaComplementar } from '@/model/TurmaComplementar';

describe('service > TurmasEquivalentesService', () => {

  const factory = new TurmasEquivalentesServiceFactory();

  it('Obtém turmas equivalentes do aluno por disciplina', async (done) => {
    const codigoDaDisciplina = 1;
    const codigoDoAluno = 2;
    factory.dadoQueApiRetorneDuasTurmasEquivalentes();

    const atual = await factory.servico.obterPor(codigoDaDisciplina, codigoDoAluno);

    const esperado = [ factory.turma48, factory.turma49 ];
    expect(atual).toEqual(esperado);

    done();
  });

  it('Obtém turmas equivalentes com composição do aluno por disciplina', async (done) => {
    const codigoDaDisciplina = 1;
    const codigoDoAluno = 2;
    factory.dadoQueApiRetorneDuasTurmasEquivalentesComComposicao();

    const atual = await factory.servico.obterPor(codigoDaDisciplina, codigoDoAluno);

    const esperado = [ factory.turma48ComComplementar, factory.turma49ComComplementar ];
    expect(atual).toEqual(esperado);

    done();
  });

});
