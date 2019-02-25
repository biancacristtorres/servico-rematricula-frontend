import aluno from '@/store/aluno';
import resumo from '@/store/resumo';
import actions, { GlobalActionTypes } from '@/store/actions';
import { StoreNamespaces } from '@/store';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { FactoryStoreBase } from '../../../FactoryStoreBase';
import { Horario } from '@/model/Horario';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { state } from '@/store/state';
import mutations from '@/store/mutations';

export class ActionsGlobalFactory extends FactoryStoreBase {

  public dadoQueAStorePossuaLinkParaVoltar(): void {
    this.store.dispatch(GlobalActionTypes.DEFINIR_LINK_PARA_VOLTAR, '/Alteracao');
  }

  public dadoQueAStorePossuaInformacoesDeAluno(): void {
    const informacoesDeAluno = new InformacoesAluno();
    informacoesDeAluno.codigoAluno = 14556;
    informacoesDeAluno.campus = 'campus';

    this.store.commit(
      `${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`,
      informacoesDeAluno);
  }

  public dadoQueAStorePossuaInformacoesDeResumo(): void {
    const horario = new Horario();
    horario.horaInicioFim = 'horaInicioFim';

    this.store.commit(
      `${ StoreNamespaces.RESUMO }/${ ResumoMutationTypes.SET_HORARIOS }`, [horario]);
    this.store.commit(
      `${ StoreNamespaces.RESUMO }/${ ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO }`, ['1', '2', '3']);
  }

  protected stubarApi(): void {
    throw new Error('Method not implemented.');
  }

  protected configurarStore() {
    return {
      modules: {
        aluno,
        resumo,
      },
      actions,
      state,
      mutations,
    };
  }

}
