import { FactoryComponentBase } from 'tests/unit/factory/FactoryComponentBase';
import {
  SetHorarioStoreDeResumoFactory,
} from '../../../../factory/store/resumo/SetHorarioStoreDeResumoFactory';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { HorarioModelBuilder } from '../../../../builders/HorarioModelBuilder';

describe('store > resumo > mutations > set horario', () => {
  const factory = new SetHorarioStoreDeResumoFactory();

  beforeEach(() => {
    factory.dadoUmaStoreVazia();
  });

  it('Uma mutation que retorna state de turma especial não confirmada como verdadeiro', async (done) => {
    const horario = HorarioModelBuilder
      .dadosAsOpcoes()
      .comDisciplinaReservada()
      .opcoes;
    const horarios = [horario];

    factory.store.commit(ResumoMutationTypes.SET_HORARIOS, horarios);

    expect(factory.store.state.existemTurmasEspeciaisNaoConfirmadas).toBeTruthy();
    expect(factory.store.state.disciplinasSemHorario).toEqual([]);
    expect(factory.store.state.existemDisciplinas).toBeTruthy();
    expect(factory.store.state.existemDisciplinasNaFilaDeEspera).toBeFalsy();

    done();
  });

  it('Uma mutation que retorna state de turma especial não confirmada como falso', async (done) => {
    const horario = HorarioModelBuilder
      .dadosAsOpcoes()
      .comDisciplinaConfrimada()
      .opcoes;
    const horarios = [horario];

    factory.store.commit(ResumoMutationTypes.SET_HORARIOS, horarios);

    expect(factory.store.state.existemTurmasEspeciaisNaoConfirmadas).toBeFalsy();
    expect(factory.store.state.disciplinasSemHorario).toEqual([]);
    expect(factory.store.state.existemDisciplinas).toBeTruthy();
    expect(factory.store.state.existemDisciplinasNaFilaDeEspera).toBeFalsy();

    done();
  });


});

