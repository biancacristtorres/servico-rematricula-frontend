import { FactoryStoreBase } from '../../FactoryStoreBase';
import { state } from '@/store/miniGrade/state';
import actions from '@/store/miniGrade/actions';
import mutations from '@/store/miniGrade/mutation';

export class CarregarMiniGradeFactory extends FactoryStoreBase {

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

  protected configurarStore() {
    return {
      state: Object.assign(state, { horarios: [] }),
      actions,
      mutations,
    };
  }

}
