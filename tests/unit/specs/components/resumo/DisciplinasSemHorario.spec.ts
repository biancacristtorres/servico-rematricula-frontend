import _ from 'lodash';
import {
   DisciplinasSemHorarioFactory,
} from '../../../factory/components/resumo/DisciplinasSemHorarioFactory';
import { DisciplinaSemHorario } from '@/model/DisciplinaSemHorario';

describe('Componente de Disciplinas Sem Horário', () => {

  const factory = new DisciplinasSemHorarioFactory();

  beforeEach(() => {
    factory.prepararContainerDeInjecaoDaApi();
    factory.dadoQueAApiDeResumoRetorneDisciplinasSemHorarioComSucesso();
  });

  afterEach(() => {
    factory.restaurarContainerDeInjecaoDaApi();
  });

  it('snapshot', async (done) => {

    await factory.montarComponente();

    expect(factory.componente).toMatchSnapshot();

    done();
  });

  it('Quando uma disciplina não possui equivalente ' +
    'deve exibir somente o nome de uma disciplina', async (done) => {
    const disciplina = new DisciplinaSemHorario();
    disciplina.nomeDisciplina = 'Disciplina Da Grade';

    await factory.montarComponente();
    const atual = factory.vueInstance.formatarNomeDisciplina(disciplina);

    const esperado = 'Disciplina Da Grade';
    expect(atual).toEqual(esperado);

    done();
  });

  it('Quando uma disciplina possui uma equivalente com nome diferente da grade ' +
    'deve exibir o nome de ambas', async (done) => {
    const disciplina = new DisciplinaSemHorario();
    disciplina.nomeDisciplina = 'Disciplina Da Grade';
    disciplina.nomeDisciplinaEquivalente = 'Disciplina Equivalente';

    await factory.montarComponente();
    const atual = factory.vueInstance.formatarNomeDisciplina(disciplina);

    const esperado = 'Disciplina Equivalente (Eq. à Disciplina Da Grade)';
    expect(atual).toEqual(esperado);

    done();
  });
});
