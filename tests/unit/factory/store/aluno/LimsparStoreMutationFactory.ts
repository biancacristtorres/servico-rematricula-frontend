import { FactoryStoreBase } from '../../FactoryStoreBase';
import { AlunoState, state } from '@/store/aluno/state';
import mutations, { AlunoMutationTypes } from '@/store/aluno/mutations';
import actions from '@/store/aluno/actions';
import getters from '@/store/aluno/getters';
import { InformacoesAluno } from '@/model/InformacoesAluno';

export class LimsparStoreMutationFactory extends FactoryStoreBase {

  public dadoQueAStorePossuaInformacoesDeAluno(): void {
    const informacoesDeAluno = new InformacoesAluno();
    informacoesDeAluno.codigoAluno = 14556;
    informacoesDeAluno.campus = 'campus';

    this.store.commit(AlunoMutationTypes.SET_INFORMACOES_ALUNO, informacoesDeAluno);
  }

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

  protected configurarStore() {
    return {
      state: Object.assign(state, { informacoesAluno: undefined }),
      mutations,
      actions,
      getters,
    };
  }

}
