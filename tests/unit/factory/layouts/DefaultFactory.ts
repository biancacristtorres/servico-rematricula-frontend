import { FactoryComponentBase } from '../FactoryComponentBase';
import Default from '@/layouts/default.vue';
import { shallowMount } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { InformacoesAluno } from '@/model/InformacoesAluno';

export class DefaultFactory extends FactoryComponentBase<Default> {

  public dadoQueEImpersonate(): void {
    store.commit(`${ StoreNamespaces.AUTORIZACAO }/${ AutorizacaoMutationTypes.SET_IMPERSONATE }`, true);
  }

  public dadoQueNaoEImpersonate(): void {
    store.commit(`${ StoreNamespaces.AUTORIZACAO }/${ AutorizacaoMutationTypes.SET_IMPERSONATE }`, false);
  }

  public dadoQueAsInformacoesDoAlunoTenhaNomeSocial(): void {
    const informacoesDoAluno = new InformacoesAluno();
    informacoesDoAluno.nomeSocial = 'Maria';

    store.commit(`${ StoreNamespaces.ALUNO }/${ AlunoMutationTypes.SET_INFORMACOES_ALUNO }`, informacoesDoAluno);
  }

  public criarWrapper(): void {
    this.componente = shallowMount(Default, {
      store,
      mocks: {
        $route: {
          fullPath: '',
        },
      },
    });
  }

}
