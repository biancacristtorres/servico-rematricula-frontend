<template></template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';
import { FreshChat } from '@/common/utils/FreshChat';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
export default class Impersonate extends Vue {

  @autorizacao.Action(AutorizacaoActionTypes.FAZER_IMPERSONATE)
  public fazerImpersonate!: (payload: any) => Promise<string>;

  @Watch('$route', { immediate: true, deep: true })
  private aoMudarURL() {
    FreshChat.limparUsuario();

    const payload = {
      tokenFuncionario: this.$route.params.tokenFuncionario,
      codigoDoAlunoAPersonificar: Number(this.$route.params.impersonate),
    };

    this.fazerImpersonate(payload).then(this.irParaRotaDefault);
  }

  private irParaRotaDefault(): void {
    this.$router.push('/');
  }

}
</script>
