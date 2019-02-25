<template>
  <div>
    <v-container v-show="podeExibirMensagemDeCarregamento">
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular class="mt-5" :size="70" :width="7" color="primary" indeterminate>
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>

    <div v-show="podeExibirContrato">
      <v-container>
        <v-layout class="container-pdf">
          <v-flex xs12>
            <arquivo-de-contrato @download-pronto="aoFinalizarDownload"></arquivo-de-contrato>
          </v-flex>
        </v-layout>
      </v-container>

      <v-footer height="80" app fixed class="justify-center elevation-10">
        <assinar-contrato></assinar-contrato>
      </v-footer>
  </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';

import ArquivoDeContrato from '@/components/contrato/ArquivoDeContrato.vue';
import AssinarContrato from '@/components/contrato/AssinarContrato.vue';

@Component({
  components: {
    ArquivoDeContrato,
    AssinarContrato,
  },
})
export default class Contrato extends Mixins<ChatMixin>(ChatMixin) {
  public carregando: boolean = true;

  public aoFinalizarDownload(): void {
    this.carregando = false;
  }

  private get podeExibirMensagemDeCarregamento(): boolean {
    return this.carregando;
  }

  private get podeExibirContrato(): boolean {
    return !this.carregando;
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variaveis.styl'
tamanho-footer = 120px
calculo-heigth-por-tamanho-dispositivo = "calc(100vh - %s - " + tamanho-footer + ")"

@media dispositivo-pequeno
  .container-pdf
    overflow-y auto
    height: calculo-heigth-por-tamanho-dispositivo % tamanho-toolbar-dispositivo-pequeno
    
@media dispositivo-medio
  .container-pdf
    height: calculo-heigth-por-tamanho-dispositivo % tamanho-toolbar-dispositivo-medio

@media dispositivo-grande
  .container-pdf
    height: calculo-heigth-por-tamanho-dispositivo % tamanho-toolbar-dispositivo-grande
</style>
