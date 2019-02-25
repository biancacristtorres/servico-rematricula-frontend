<template>
  <v-btn 
    id="assinar-contrato" 
    color="primary"
    :loading="carregando"
    @click.native="assinarContrato" 
    large>
    Li, concordo e aceito os termos propostos
  </v-btn>
</template>

<script lang='ts'>
import { Container } from 'typescript-ioc';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AssinarContratoService } from '@/services/contrato/AssinarContratoService';
import { AlunoActionTypes } from '@/store/aluno/actions';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import AceiteTermosContratoEvent from '@/model/analytics/AceiteTermosContratoEvent.ts';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);
const aluno = namespace(StoreNamespaces.ALUNO);

@Component({})
export default class AssinarContrato extends Vue {

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  private get assinarContratoService(): AssinarContratoService {
    return Container.get(AssinarContratoService);
  }

  public carregando: boolean = false;

  @aluno.Action(AlunoActionTypes.LIMPAR_INFORMACOES_ALUNO)
  public limparInformacoesDoAluno!: () => Promise<void>;

  @autorizacao.State
  private usuarioLogado!: UsuarioIdentity;

  private assinarContrato(): void {
    this.carregando = true;
    this.tentarAssinarContrato().then(this.aoTentarAssinarContrato);
  }

  private async tentarAssinarContrato(): Promise<boolean> {
    try {
      return await this.assinarContratoService.processar(this.codigoDoAluno);
    } catch {
      return false;
    }
  }

  private aoTentarAssinarContrato(contratoFoiAssinado: boolean): void {
    if (contratoFoiAssinado) {
      this.limparInformacoesDoAluno();
      this.$analytics.track(new AceiteTermosContratoEvent('click'));
      this.$router.push('/Resumo');
    } else {
      this.$router.push('/erro/SistemaIndisponivel');
    }
  }

}
</script>
