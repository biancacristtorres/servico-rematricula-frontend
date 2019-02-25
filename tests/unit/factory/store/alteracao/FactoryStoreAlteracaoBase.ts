import { FactoryStoreBase } from '../../FactoryStoreBase';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import { Disciplina } from '@/model/Disciplina';
import { state } from '@/store/alteracao/state';
import mutations, { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import actions from '@/store/alteracao/actions';
import getters from '@/store/alteracao/getters';
import { default as mutationsMiniGrade } from '@/store/miniGrade/mutation';
import { default as actionsMiniGrade } from '@/store/miniGrade/actions';
import { default as gettersMiniGrade } from '@/store/miniGrade/getters';

export abstract class FactoryStoreAlteracaoBase extends FactoryStoreBase {
  public codigoCalculoI: number = 1;

  public calculoI() {
    return new Disciplina(this.codigoCalculoI, 'Cálculo I', SituacaoDaDisciplina.Confirmada, '3B', false);
  }

  public dadoOStateComCalculoI(): void {
    this.dadoOStateDeDisciplinasCom(this.calculoI());
  }

  public dadoOStateDeDisciplinasCom(...disciplinas: Disciplina[]) {
    this.store.commit(AlteracaoMutationsTypes.SET_DISCIPLINAS, disciplinas);
  }

  protected configurarStore() {
    return {
      modules: {
        miniGrade: this.moduloDeMiniGrade,
      },
      state: Object.assign(state, { disciplinas: [] }),
      mutations,
      actions,
      getters,
    };
  }

  public get moduloDeMiniGrade() {
    return {
      state: Object.assign(state, { horarios: [] }),
      mutationsMiniGrade,
      actionsMiniGrade,
      gettersMiniGrade,
    };
  }
}
