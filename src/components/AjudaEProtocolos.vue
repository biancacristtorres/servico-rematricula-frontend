<template>
  <router-link id="url-fresh-desk" v-if="usuarioEstaLogado" class='link-flat' :to="'Ajuda'" target="_blank">
    <v-btn v-if="$vuetify.breakpoint.smAndDown"  icon flat>
      <v-icon >
        help_outline
      </v-icon>
    </v-btn>

    <v-btn v-else flat>
      Ajuda e protocolos
    </v-btn>
  </router-link>
</template>

<style lang="stylus" scoped>
.btnAjudaEProtocolos
  width: 184px
  text-transform: none
  
.link-flat
  text-decoration: none
</style>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import { AutorizacaoGetterTypes } from 'componente-frontend-core/store/autorizacao/getters';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const marca = namespace(StoreNamespaces.MARCA);

@Component({})
export default class PessoaLogada extends Vue {
  @autorizacaoNamespace.Getter(AutorizacaoGetterTypes.USUARIO_ESTA_LOGADO)
  public usuarioEstaLogado!: boolean;

  public get deveExibirComponente() {
    return this.usuarioEstaLogado;
  }
}
</script>