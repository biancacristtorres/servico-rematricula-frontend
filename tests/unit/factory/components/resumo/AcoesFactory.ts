import Acoes from '@/components/resumo/Acoes.vue';
import { Horario } from '@/model/Horario';
import { FactoryComponentBase } from '../../FactoryComponentBase';
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import store, { StoreNamespaces } from '@/store';
import { FeatureFlag } from 'componente-frontend-core/model/FeatureFlag';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { FeatureTogglePlugin } from 'componente-frontend-core/plugins/FeatureToggle';
import { ResumoMutationTypes } from '@/store/resumo/mutations';
import { DadoUmAcessoLiberadoAAlteracao } from '../../../doubles/stubs/resumo/DadoUmAcessoLiberadoAAlteracao';
import { DadoUmAcessoNegadoAAlteracao } from '../../../doubles/stubs/resumo/DadoUmAcessoNegadoAAlteracao';
import { HttpService } from 'componente-frontend-core/services/HttpService';
import { Container } from 'typescript-ioc';
import { DadoUmEnvioDeComprovanteComSucesso } from '../../../doubles/stubs/resumo/DadoUmEnvioDeComprovanteComSucesso';
import { DialogoPlugin } from '@/common/plugins/dialogo';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';
import { DisciplinaResumo } from '../../../../../src/model/DisciplinaResumo';
import { HorarioModelBuilder } from '../../../builders/HorarioModelBuilder';

export class AcoesFactory extends FactoryComponentBase<Acoes> {
  public featureFlagStubs?: FeatureFlag[];

  public criarWrapper(): void {

    localVue.use(FeatureTogglePlugin, store, this.featureFlagStubs);
    localVue.use(DialogoPlugin);

    this.componente = mount(Acoes, { localVue, store });
  }

  public dadoQueTelaDeAlteracaoEstaHabilitada() {
    const alteracaoHabilitada = new FeatureFlag();
    alteracaoHabilitada.name = ToggleConstants.HabilitarTelaDeAlteracaoDeDisciplinas;
    alteracaoHabilitada.status = true;

    this.featureFlagStubs = [alteracaoHabilitada];
  }

  public dadoQueTelaDeAlteracaoEstaDesabilitada() {
    const alteracaoHabilitada = new FeatureFlag();
    alteracaoHabilitada.name = ToggleConstants.HabilitarTelaDeAlteracaoDeDisciplinas;
    alteracaoHabilitada.status = false;

    this.featureFlagStubs = [alteracaoHabilitada];
  }

  public dadoQueAStorePossuaInformacoesDeResumo(): void {
    const horario = new Horario();
    horario.horaInicioFim = 'horaInicioFim';

    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_HORARIOS}`, [horario]);
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO}`, ['1', '2', '3']);
  }

  public dadoQueAStorePossuaInformacoesDeResumoComFilaDeEspera(): void {
    const horario = new Horario();
    horario.horaInicioFim = 'horaInicioFim';
    horario.disciplinasPorDiaDeSemana = new DisciplinasPorDiaDeSemana();

    const disciplinaResumo = new DisciplinaResumo();
    disciplinaResumo.codigoDisciplina = 2;
    disciplinaResumo.status = 7;

    horario.disciplinasPorDiaDeSemana[2] = [disciplinaResumo];

    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_HORARIOS}`, [horario]);
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO}`, ['1', '2', '3']);
  }

  public dadoQueAStoreNaoPossuaInformacoesDeResumo(): void {
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_HORARIOS}`, []);
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO}`, []);
  }

  public dadoQueAApiDeStatusRetornouComSucesso(): void {
    Container.bind(HttpService).to(DadoUmAcessoLiberadoAAlteracao);
  }

  public dadoQueAApiDeStatusRetornouErro(): void {
    Container.bind(HttpService).to(DadoUmAcessoNegadoAAlteracao);
  }

  public dadoQueOComprovanteFoiEnviadoComSucesso(): void {
    Container.bind(HttpService).to(DadoUmEnvioDeComprovanteComSucesso);
  }

  public get getMensagem(): string {
    return this.componente.find('#mensagem').text();
  }

  public botaoEnviarComprovante(): Wrapper<any> {
    return this.componente.find('#enviar-comprovante');
  }

  public clicarNoBotaoEnviarComprovante(): void {
    this.botaoEnviarComprovante().trigger('click');
  }

  public espionarPostDaApi() {
    this.espiao = jest.spyOn(DadoUmEnvioDeComprovanteComSucesso.prototype, 'post');
  }

  public dadoQueAStorePossuaInformacoesDeResumoComDisciplinaComTurmaEspecial(): void {
    const horario = HorarioModelBuilder
      .dadosAsOpcoes()
      .comDisciplinaReservada()
      .opcoes;

    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.LIMPAR_STORE}`);
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_HORARIOS}`, [horario]);
    store.commit(
      `${StoreNamespaces.RESUMO}/${ResumoMutationTypes.SET_DISCIPLINAS_SEM_HORARIO}`, []);
  }
}
