import { FactoryStoreBase } from '../../FactoryStoreBase';
import getters from '@/store/resumo/getters';
import actions from '@/store/resumo/actions';
import mutations from '@/store/resumo/mutations';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { Horario } from '@/model/Horario';
import { state } from '@/store/resumo/state';

export class LimparStoreDeResumoFactory extends FactoryStoreBase {

  public dadoQueAStorePossuaInformacoesDeResumo(): void {
    const horario = new Horario();
    horario.horaInicioFim = 'horaInicioFim';

    this.store.commit(ResumoMutationTypes.SET_HORARIOS, [horario]);
    this.store.commit(ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO, ['1', '2', '3']);
  }

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

  protected configurarStore() {
    return {
      state: Object.assign(state, {
        horarios: [],
        disciplinasSemHorario: [],
        existemDisciplinas: true,
        existemDisciplinasNaFilaDeEspera: false,
      }),
      mutations,
      actions,
      getters,
    };
  }

}
