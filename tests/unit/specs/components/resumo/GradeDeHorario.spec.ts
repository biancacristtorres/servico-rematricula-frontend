import {
  GradeDeHorarioFactory,
} from '../../../factory/components/resumo/GradeDeHorarioFactory';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';

describe('Componente de GradeDeHorario', () => {
  const factory = new GradeDeHorarioFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueAApiDeResumoRetorneDisciplinaComTurmaEspecialComSucesso();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('snapshot', async (done) => {
    await factory.montarComponente();

    expect(factory.componente)
      .toMatchSnapshot();

    done();
  });

  it('Exibe ícone de turma especial', async (done) => {
    await factory.montarComponente();

    expect(factory.getPossuiDisciplinaTurmaEspecial).toBeTruthy();

    done();
  });

  it('Quando uma disciplina não possui equivalente ' +
    'deve exibir somente o nome de uma disciplina', async (done) => {
    const disciplina = new DisciplinaResumo();
    disciplina.nomeDisciplina = 'Disciplina Da Grade';
    disciplina.descricaoTurma = 'XXXX-XXX';

    await factory.montarComponente();
    const atual = factory.vueInstance.formatarNomeDisciplina(disciplina);

    const esperado = 'Disciplina Da Grade (XXXX-XXX)';
    expect(atual).toEqual(esperado);

    done();
  });

  it('Quando uma disciplina possui uma equivalente com nome diferente da grade ' +
    'deve exibir o nome de ambas', async (done) => {
    const disciplina = new DisciplinaResumo();
    disciplina.nomeDisciplina = 'Disciplina Da Grade';
    disciplina.nomeDisciplinaEquivalente = 'Disciplina Equivalente';
    disciplina.descricaoTurma = 'XXXX-XXX';

    await factory.montarComponente();
    const atual = factory.vueInstance.formatarNomeDisciplina(disciplina);

    const esperado = 'Disciplina Equivalente (Eq. à Disciplina Da Grade)<br/> (XXXX-XXX)';
    expect(atual).toEqual(esperado);

    done();
  });

  it('Quando uma disciplina possui uma equivalente com nome igual ao da grade ' +
    'deve exibir somente o nome de uma disciplina', async (done) => {
    const disciplina = new DisciplinaResumo();
    disciplina.nomeDisciplina = 'Disciplina Da Grade';
    disciplina.nomeDisciplinaEquivalente = disciplina.nomeDisciplina;
    disciplina.descricaoTurma = 'XXXX-XXX';

    await factory.montarComponente();
    const atual = factory.vueInstance.formatarNomeDisciplina(disciplina);

    const esperado = 'Disciplina Da Grade (XXXX-XXX)';
    expect(atual).toEqual(esperado);

    done();
  });
});
