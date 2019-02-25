import { FactoryStoreBase } from '../../FactoryStoreBase';
import { state } from '@/store/resumo/state';
import mutations from '@/store/resumo/mutations';
import actions from '@/store/resumo/actions';
import getters from '@/store/resumo/getters';

export class SetHorarioStoreDeResumoFactory extends FactoryStoreBase {

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
        existemTurmasEspeciaisNaoConfirmadas: false,
      }),
      mutations,
      actions,
      getters,
    };
  }
}
