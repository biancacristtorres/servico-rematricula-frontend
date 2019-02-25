<template>
<v-container bg fill-height grid-list-md text-xs-center>
  <v-layout row wrap align-center>
    <v-flex class="display-1 grey--text">
      Redirecionando...
    </v-flex>
  </v-layout>
</v-container>
</template>

<script lang='ts'>
import { ObterAcessoAoFreshDeskService } from '@/services/ObterAcessoAoFreshDeskService';
import { Vue, Component } from 'vue-property-decorator';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import { Container } from 'typescript-ioc';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
export default class Ajuda extends Vue {
  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  private get obterAcessoAoFreshDeskService(): ObterAcessoAoFreshDeskService {
    return Container.get(ObterAcessoAoFreshDeskService);
  }

  public async mounted() {
    this.obterAcessoAoFreshDeskService.processar(this.usuarioLogado.codigo || 0)
      .then((response) => {
        location.href = response;
      });
  }
}
</script>