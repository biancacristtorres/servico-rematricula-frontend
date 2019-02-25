import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import {
  DisciplinaDisponivelServiceFactory,
} from '../../../factory/services/alteracao/DisciplinaDisponivelServiceFactory';

describe('service > DisciplinaDisponivelService', () => {
  const factory = new DisciplinaDisponivelServiceFactory();

  it('Obter por aluno', async (done) => {
    const codigoDoAluno = 175988;
    factory.dadoQueApiRetorneDuasDisciplinasDisponiveis();

    const atual = await factory.servico.obter(codigoDoAluno);

    const esperado = new Array<Disciplina>(
      new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false),
      new Disciplina(2, 'Física II', SituacaoDaDisciplina.Liberada, '3B', false),
    );
    expect(atual).toStrictEqual(esperado);

    done();
  });

  it('Obter disciplina com equivalência 2x1', async (done) => {
    const codigoAluno = 1;
    factory.dadoQueApiRetorneUmaDisciplinaComEquivalenciaDoisPorUm();

    const atual = await factory.servico.obter(codigoAluno);

    const disciplinaEsperado = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
    disciplinaEsperado.possuiEquivalenciaDoisPorUm = true;
    const esperado = new Array<Disciplina>(
      disciplinaEsperado,
    );
    expect(atual).toStrictEqual(esperado);

    done();
  });

});
