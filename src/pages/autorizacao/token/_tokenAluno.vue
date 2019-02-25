<template></template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';
import { FreshChat } from '@/common/utils/FreshChat';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
export default class TokenAluno extends Vue {

  @autorizacao.Action(AutorizacaoActionTypes.FAZER_LOGIN_ATRAVES_DE_TOKEN)
  public fazerLoginAtravesDeToken!: (dados: any) => Promise<string>;

  @Watch('$route', { immediate: true, deep: true })
  private aoMudarURL() {
    FreshChat.limparUsuario();

    this
      .fazerLoginAtravesDeToken(this.$route.params.tokenAluno)
      .then(this.irParaRotaDefault);
  }

  private irParaRotaDefault(): void {
    this.$router.push('/');
  }

}
</script>
