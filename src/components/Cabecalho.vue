<template>
  <v-toolbar color="primary" dark >
    <template v-if="deveExibirVoltar">
      <v-btn id="link-para-voltar" @click.native="voltar" icon>
        <v-icon>
          arrow_back
        </v-icon>
      </v-btn>
    </template>

    <v-toolbar-title id="titulo-cabecalho">
      {{ titulo }}
    </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <ajuda-e-protocolos v-if="deveExibir" id="ajuda-e-protocolos">
    </ajuda-e-protocolos>

    <pessoa-logada v-if="deveExibir" id="pessoa-logada">
    </pessoa-logada>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { GlobalActionTypes } from '@/store/actions';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { RotasSemValidacao } from '@/config/router/RotasSemValidacao';
import AjudaEProtocolos from '@/components/AjudaEProtocolos.vue';
import PessoaLogada from '@/components/PessoaLogada.vue';

const alteracao = namespace(StoreNamespaces.ALTERACAO);

@Component({components: { AjudaEProtocolos, PessoaLogada }})
export default class Cabecalho extends Vue {

  public get deveExibirVoltar(): boolean {
    return Boolean(this.linkParaVoltar);
  }

  @Action(GlobalActionTypes.LIMPAR_LINK_PARA_VOLTAR)
  public limparLinkParaVoltar!: () => Promise<void>;

  @alteracao.Getter(AlteracaoGetterTypes.POSSUI_ALTERACAO)
  public possuiAlteracao!: boolean;

  @Prop()
  private titulo!: string;

  @State
  private linkParaVoltar!: string;

  public async voltar(): Promise<void> {
    if (await this.deveRedirecionarParaOResumo()) {
      this.redirecionarParaOResumo();
    }
  }

  private async deveRedirecionarParaOResumo(): Promise<boolean> {
    return this.possuiAlteracao ?
      await this.usuarioQuerPerderAlteracoes() :
      true;
  }

  private async usuarioQuerPerderAlteracoes(): Promise<boolean>  {
    const opcoes = new OpcoesDeDialogo(
      'OPS! Você não salvou',
      'Você não salvou suas alterações, tem certeza que deseja sair assim mesmo?',
      'SIM',
      'NÃO',
    );

    try {
      await this.$dialogo.abrir(opcoes);
      return true;
    } catch (error) {
      return false;
    }
  }

  private redirecionarParaOResumo(): void {
    this.$router.push(this.linkParaVoltar);
  }

  private get deveExibir(): boolean {
    return !this.estaNaTelaDeErroDeSistema;
  }

  private get estaNaTelaDeErroDeSistema(): boolean {
    const fullPath = this.$route.fullPath.toLowerCase();
    const erroDeSistema = RotasSemValidacao.ErroDeSistema.toLowerCase();
    return fullPath.includes(erroDeSistema);
  }

  @Watch('$route', { immediate: true, deep: true })
  private aoMudarURL() {
    this.limparLinkParaVoltar();
  }
}
</script>
