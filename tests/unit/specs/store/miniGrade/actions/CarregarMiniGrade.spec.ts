import {
  CarregarMiniGradeFactory,
} from '../../../../factory/store/miniGrade/CarregarMiniGradeFactory';
import { HorarioDaMiniGrade } from '@/model/HorarioDaMiniGrade';
import { DisciplinasPorDiaDeSemanaDaMiniGrade } from '@/model/DisciplinasPorDiaDeSemanaDaMiniGrade';
import { DisciplinaMiniGrade } from '@/model/DisciplinaMiniGrade';
import { MiniGradeActionTypes } from '@/store/miniGrade/actions';

describe('store > miniGrade > actions', () => {

  const factory = new CarregarMiniGradeFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Carrega os dados da mini grade na store', async (done) => {
    const calculoI =  new DisciplinaMiniGrade();
    calculoI.codigoDisciplina = 143924;
    calculoI.nomeDisciplina = 'Cálculo I';

    const disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemanaDaMiniGrade();
    disciplinasPorDiaDeSemana[2] = [ calculoI ];
    disciplinasPorDiaDeSemana[5] = [ calculoI ];

    const horario =  new HorarioDaMiniGrade();
    horario.horaInicio = '20:55h';
    horario.disciplinasPorDiaDeSemana = disciplinasPorDiaDeSemana;

    await factory.store.dispatch(MiniGradeActionTypes.CARREGAR_MINI_GRADE, [ horario ]);

    expect(factory.store.state.horarios).toContainEqual(horario);
    done();
  });

});
