import { FactoryComponentBase } from '../FactoryComponentBase';
import ChatMixinDummy from '../../doubles/dummies/ChatMixinDummy.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { FeatureTogglePlugin } from 'componente-frontend-core/plugins/FeatureToggle';
import { AlunoMutationTypes } from '@/store/aluno/mutations';
import { AutorizacaoMutationTypes } from 'componente-frontend-core/store/autorizacao/mutations';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { Instituicao } from '@/common/enum/Instituicao';

export class ChatMixinDummyFactory extends FactoryComponentBase<ChatMixinDummy> {

  public featureFlagStubs?: FeatureFlag[];

  public criarWrapper(): void {
    const localVueSingle = createLocalVue();
    localVueSingle.use(FeatureTogglePlugin, store, this.featureFlagStubs);

    this.componente = shallowMount(ChatMixinDummy, { localVue: localVueSingle, store });
  }

  public dadoQueOToggleDoChatEstaHabilitado() {
    const chatHabilitado = new FeatureFlag();
    chatHabilitado.name = ToggleConstants.HabilitarFreshChat;
    chatHabilitado.status = true;

    this.featureFlagStubs = [chatHabilitado];
  }

  public dadoQueOToggleDoChatEstaDesabilitado() {
    const chatDesabilitado = new FeatureFlag();
    chatDesabilitado.name = ToggleConstants.HabilitarFreshChat;
    chatDesabilitado.status = false;

    this.featureFlagStubs = [chatDesabilitado];
  }

  public dadoQueAsInformacoesEstaoCarregadasNaStore() {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.codigoInstituicao = Instituicao.UniBhBeloHorizonte;

    const setUsuarioDecMutation = `${StoreNamespaces.AUTORIZACAO}/${AutorizacaoMutationTypes.SET_USUARIO_DECODIFICADO}`;
    const setInfoAlunoMutation = `${StoreNamespaces.ALUNO}/${AlunoMutationTypes.SET_INFORMACOES_ALUNO}`;
    store.commit(setUsuarioDecMutation, {});
    store.commit(setInfoAlunoMutation, informacoesAluno);
  }

  public dadoQueEUmAlunoDaInstituicaoSaoJudas(): void {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.codigoInstituicao = Instituicao.Unimonte;

    const setInfoAlunoMutation = `${StoreNamespaces.ALUNO}/${AlunoMutationTypes.SET_INFORMACOES_ALUNO}`;
    store.commit(setInfoAlunoMutation, informacoesAluno);
  }

  public dadoQueEUmAlunoDaInstituicaoUnibh(): void {
    const informacoesAluno = new InformacoesAluno();
    informacoesAluno.codigoInstituicao = Instituicao.UniBhBeloHorizonte;

    const setInfoAlunoMutation = `${StoreNamespaces.ALUNO}/${AlunoMutationTypes.SET_INFORMACOES_ALUNO}`;
    store.commit(setInfoAlunoMutation, informacoesAluno);
  }
  public dadoQueNaoExistemInformacoesDeAluno(): void {

    const setInfoAlunoMutation = `${StoreNamespaces.ALUNO}/${AlunoMutationTypes.SET_INFORMACOES_ALUNO}`;
    store.commit(setInfoAlunoMutation, null);
  }

}
