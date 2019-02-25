import { FactoryComponentBase } from '../../FactoryComponentBase';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { Container } from 'typescript-ioc';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import {
  DadoUmaAlteracaoSalvaComSucesso,
} from '../../../doubles/stubs/alteracao/salvarAlteracoes/DadoUmaAlteracaoSalvaComSucesso';
import SalvarAlteracoes from '@/components/alteracao/SalvarAlteracoes.vue';
import store, { StoreNamespaces } from '@/store';
import { DadoUmaAlteracaoQueRetornouErro,
} from '../../../doubles/stubs/alteracao/salvarAlteracoes/DadoUmaAlteracaoQueRetornouErro';
import { DialogoPlugin } from '@/common/plugins/dialogo';
import { AlteracaoMutationsTypes } from '@/store/alteracao/mutations';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';


export class SalvarAlteracoesFactory extends FactoryComponentBase<SalvarAlteracoes> {
  public redirecionamento: jest.Mock<any> = jest.fn();

  public dadoQueAsAlteracoesForamSalvasComSucesso(): void {
    Container.bind(HttpService).to(DadoUmaAlteracaoSalvaComSucesso);
  }

  public dadoQueOcorreuErroAoSalvarAlteracoes(): void {
    Container.bind(HttpService).to(DadoUmaAlteracaoQueRetornouErro);
  }

  public dadoQueEstaAcontecendoUmaAlteracaoDeTurma(): void {
    store.commit(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_ALTERANDO }`, true);
  }

  public dadoQueNaoEstaAcontecendoUmaAlteracaoDeTurma(): void {
    store.commit(`${ StoreNamespaces.ALTERACAO }/${ AlteracaoMutationsTypes.SET_ALTERANDO }`, false);
  }

  public dadoQueExistemDisciplinasDisponiveis(): void {
    const calculoI = new Disciplina(1, 'Cálculo I', SituacaoDaDisciplina.Confirmada, 'C', false);
    store.commit(`${ StoreNamespaces.ALTERACAO }/${AlteracaoMutationsTypes.SET_DISCIPLINAS }`, [calculoI]);
  }

  public oBotaoSalvarEstaEmLoading(): boolean {
    return this.componente.find('#salvar-alteracoes[loading=true]').exists();
  }

  public async salvarAlteracoes(): Promise<void> {
    this.componente.find('#salvar-alteracoes').trigger('click');
    await this.aguardarRenderizacao();
  }

  public criarWrapper(): void {
    const vueComPluginDeDialogo = createLocalVue();
    vueComPluginDeDialogo.use(DialogoPlugin);

    this.componente = shallowMount(SalvarAlteracoes, {
      localVue: vueComPluginDeDialogo,
      store,
      mocks: {
        $router: {
          push: (to: string) => {
            this.redirecionamento(to);
          },
        },
      },
    });
  }
}
