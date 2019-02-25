<template>
  <v-app class="grey lighten-2 app-rematricula">
    <cabecalho :titulo="'Rematrícula'" v-if="!estaNaTelaDeLogin"></cabecalho>

    <v-content>
      <router-view>
      </router-view>
    </v-content>

    <v-btn id="impersonate" v-if="impersonate"
        color="primary"
        fixed
        bottom
        left>
        {{ textoDoBotaoDeImpersonate() }}
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import Cabecalho from '@/components/Cabecalho.vue';
const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);
const aluno = namespace(StoreNamespaces.ALUNO);

@Component({ components: { Cabecalho }})
export default class LayoutPage extends Vue {

  @autorizacao.State
  public impersonate!: boolean;

  @aluno.State
  public informacoesAluno!: InformacoesAluno;

  private get estaNaTelaDeLogin(): boolean {
    const fullPath = this.$route.fullPath.toLowerCase();
    return fullPath.includes('/login');
  }

  public textoDoBotaoDeImpersonate(): string {
    return `Você está logado como ${ this.informacoesAluno ? this.informacoesAluno.nomeSocial : '' }`;
  }
}
</script>