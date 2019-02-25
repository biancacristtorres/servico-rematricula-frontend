<template>
  <div class="arquivo-de-contrato">
    <template v-if="eMobile">
      <v-layout justify-center>
        <v-flex xs12 sm6 class="text-xs-center">
          <v-avatar :tile="true" :size="'96px'">
            <img :src="srcCapelo" alt="Capelo">
          </v-avatar>

          <p class="grey--text text--darken-2 subheading mt-3 mb-0">
            Aqui, você pode fazer o download do seu contrato estudantil. 
          </p>
          <p class="grey--text text--darken-2 subheading">
            Para continuar, você deve aceitar os termos propostos.
          </p>

          <a class="subheading" id="baixar-pdf" @click.stop="abrirContratoEmNovaAba">
            Download do contrato estudantil
          </a>
        </v-flex>
      </v-layout>
    </template>

    <template v-else>
      <iframe id="visualizador-de-pdf" :src="pdf">
      </iframe>
    </template>
  </div>
</template>

<script lang='ts'>
import { Container } from 'typescript-ioc';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BaixarContratoService } from '@/services/contrato/BaixarContratoService';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import AceiteTermosContratoEvent from '@/model/analytics/AceiteTermosContratoEvent.ts';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
export default class ArquivoDeContrato extends Vue {

  public get eMobile(): boolean {
    return this.$vuetify.breakpoint.xsOnly;
  }

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  public get srcCapelo() {
    return `${process.env.BASE_URL}svg/capelo.svg`;
  }

  private get baixarContratoService(): BaixarContratoService {
    return Container.get(BaixarContratoService);
  }

  public pdf: string = '';

  @autorizacao.State
  private usuarioLogado!: UsuarioIdentity;

  public async created() {
    this.pdf =  await this.baixarContratoService.processar(this.codigoDoAluno);
    this.aoTerminarODownloadDoContrato();
  }

  public aoTerminarODownloadDoContrato(): void {
    this.$emit('download-pronto');
  }

  public abrirContratoEmNovaAba(): void {
    this.$analytics.track(new AceiteTermosContratoEvent('download'));
    open(this.pdf, '_blank');
  }
}
</script>

<style lang="stylus" scoped>
.arquivo-de-contrato
iframe
    width 100%
    height 100%
</style>
