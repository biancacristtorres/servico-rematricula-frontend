import {
  RequestDeSelecaoDeTurmaServiceFactory,
} from '../../../factory/services/alteracao/RequestDeSelecaoDeTurmaService';
import { Turma } from '@/model/Turma';
import { HorarioSemanal } from '@/model/HorarioSemanal';
import { DiaDaSemana } from '@/common/enum/DiaDaSemana';
import { TurmaComplementar } from '@/model/TurmaComplementar';
import { SelecaoDeTurmaRequest } from '@/services/alteracao/request/SelecaoDeTurmaRequest';

describe('service > SelecaoDeTurmaService', () => {
  const factory = new RequestDeSelecaoDeTurmaServiceFactory();

  it('Gera um request para seleção de turma', () => {
    const codigoDaDisciplina = 5359;
    const nomeDaDisciplina = 'Calculo';

    const horarioSemanal = new HorarioSemanal();
    horarioSemanal.diaDaSemana = DiaDaSemana.Segunda;
    horarioSemanal.horaInicio = new Date();
    horarioSemanal.horaFim = new Date();

    const turmaComplementar = new TurmaComplementar();
    turmaComplementar.codigo = 3788;
    turmaComplementar.horariosDeTurmaSemanal = [horarioSemanal];
    turmaComplementar.horariosDeTurmaPorData = [];

    const turma =  new Turma();
    turma.codigo = 4972;
    turma.codigoDaDisciplina = codigoDaDisciplina;
    turma.horariosDeTurmaSemanal = [horarioSemanal];
    turma.horariosDeTurmaPorData = [];
    turma.complementares = [turmaComplementar];

    const request: SelecaoDeTurmaRequest = factory.servico.obterPor(codigoDaDisciplina, nomeDaDisciplina, turma);

    expect(request.codigoDaDisciplina).toEqual(codigoDaDisciplina);
    expect(request.turma.codigo).toEqual(turma.codigo);
    expect(request.turma.horariosDeTurmaSemanal).toContainEqual(horarioSemanal);
    expect(request.turma.complementares[0].codigo).toEqual(turmaComplementar.codigo);
    expect(request.turma.complementares[0].horariosDeTurmaSemanal).toContainEqual(horarioSemanal);
  });
});
