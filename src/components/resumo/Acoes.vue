<template>
  <v-container class="px-0 py-0">
    <v-layout row wrap>
      <v-flex xs12 md7 class="mb-3 pr-2">
        <v-card class="mx-auto fill-height" light flat>
          <v-card-title>
            <v-flex xs2>
              <v-icon large left color="gray" class="mt-1">{{ icone }}</v-icon>
            </v-flex>
            <v-flex xs8>
              <p
                id="mensagem"
                class="text-xs-left ml-3 mb-0 mt-1 body-1 font-weight-light"
              >{{ mensagem }}</p>
            </v-flex>
            <v-flex xs2>
              <v-tooltip bottom max-width="300px">
                  <v-icon slot="activator" medium class="ml-3">
                    mdi-information-outline
                  </v-icon>
                  <span>
                    {{mensagemTooltip}}
                  </span>
                </v-tooltip>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12 md5 class="mb-3 pr-2" >
        <v-layout align-center justify-center column fill-height>
          <v-btn
            id="alterar-disciplinas"
            :to=" {name: 'Alteracao' }"
            :disabled="!habilitarTelaDeAlteracaoDeDisciplinas"
            block
            depressed
            class="mt-0"
            color="secondary"
          >Alterar Disciplinas e Horários</v-btn>

          <v-btn
            id="enviar-comprovante"
            block
            depressed
            @click="enviarComprovantePorEmail"
            :loading="enviandoComprovante"
            class="my-0"
            color="primary"
          >Enviar Comprovante por E-mail</v-btn>
        </v-layout>
      </v-flex>

      <nps></nps>
    </v-layout>
  </v-container>
</template>

<style lang="stylus" scoped>
.fill-width {
  width: 100%;
}

.icone {
  height: 100%;
  width: 72px;
}

.container-texto {
  display: table;
}

.texto {
  display: table-cell;
  vertical-align: middle;
}
</style>

<script lang='ts'>
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { SituacaoDaMatricula } from '@/common/enum/SituacaoDaMatricula';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AcessarAlteracaoService } from '@/services/alteracao/AcessarAlteracaoService';
import { EnviarComprovanteService } from '@/services/resumo/EnviarComprovanteService';
import { Container } from 'typescript-ioc';
import { Horario } from '@/model/Horario';
import EnvioComprovanteEmailEvent from '@/model/analytics/EnvioComprovanteEmailEvent';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import Nps from '@/components/Nps.vue';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const featureToggle = namespace(StoreNamespaces.FEATURE_TOGGLE);
const ResumoNamespace = namespace(StoreNamespaces.RESUMO);

@Component({
  components: { Nps },
})
export default class Acoes extends Vue {

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @featureToggle.State
  public features!: any[];

  @ResumoNamespace.State
  public existemDisciplinas!: boolean;

  @ResumoNamespace.State
  public existemDisciplinasNaFilaDeEspera!: boolean;

  @ResumoNamespace.State
  public existemTurmasEspeciaisNaoConfirmadas!: boolean;

  private situacaoDaMatricula: SituacaoDaMatricula = SituacaoDaMatricula.Liberada;
  private enviandoComprovante: boolean = false;
  private habilitarTelaDeAlteracaoDeDisciplinas: boolean = false;
  private toggleHabilitado: boolean = true;

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  private get acessarAlteracaoService(): AcessarAlteracaoService {
    return Container.get(AcessarAlteracaoService);
  }

  private get enviarComprovanteService(): EnviarComprovanteService {
    return Container.get(EnviarComprovanteService);
  }

  public async mounted() {
    this.verificarPermissaoAlteracao();
    this.toggleHabilitado = await this.toggleDeAlteracaoEstaHabilitado();
  }

  public get icone(): string {
    if (!this.existemDisciplinas) {
      return 'error_outline';
    } else if (this.existemDisciplinasNaFilaDeEspera) {
      return 'alarm';
    } else if (this.existemTurmasEspeciaisNaoConfirmadas) {
        return 'mdi-alert-outline';
    } else if (this.rematriculaEstaConfirmada) {
      return 'check';
    }
    return 'repeat';
  }

  public get mensagem(): string {
    if (!this.existemDisciplinas && this.rematriculaEstaConfirmada) {
      return 'Sua grade está vazia, selecione disciplinas para cursar, \
              clicando no botão "Alterar Disciplinas e Horários" ao lado.';
    } else if (this.rematriculaEstaConfirmada && this.existemDisciplinasNaFilaDeEspera) {
      return 'Atenção, existem turmas em fila de espera.';
    } else if (this.rematriculaEstaConfirmada && this.existemTurmasEspeciaisNaoConfirmadas) {
        return 'A turma especial que você escolheu, por enquanto não possui o número mínimo de ' +
         'alunos para ser confirmada. Caso isso aconteça, sua vaga será confirmada automaticamente.';
    } else if (this.rematriculaEstaConfirmada) {
      return 'Parabéns, sua rematrícula está confirmada e suas vagas estão garantidas.';
    } else {
      return 'Alterações feitas com sucesso. Aguarde, estamos atualizando o seu quadro de horário.';
    }
  }

  public get mensagemTooltip(): string {
    if (!this.existemDisciplinas && this.rematriculaEstaConfirmada) {
      return 'Sua grade está vazia, selecione disciplinas para cursar, \
              clicando no botão "Alterar Disciplinas e Horários" ao lado.';
    } else if (this.rematriculaEstaConfirmada && this.existemDisciplinasNaFilaDeEspera) {
      return 'Sua vaga ainda não está garantida. A turma escolhida possui fila de espera. \
              Na existência de uma vaga você será matriculado automaticamente.';
    } else if (this.rematriculaEstaConfirmada && this.existemTurmasEspeciaisNaoConfirmadas) {
        return 'A turma especial que você escolheu, por enquanto não possui o número mínimo \
                de alunos para ser confirmada. Caso isso aconteça, sua vaga será confirmada \
                automaticamente.';
    } else if (this.rematriculaEstaConfirmada) {
      return 'Você garantiu vaga em todas as turmas confirmadas no quadro abaixo. ;)';
    } else {
      return 'Em alguns instantes o quadro será atualizado com suas confirmações.';
    }
  }

  public get rematriculaEstaConfirmada(): boolean {
    return  (this.situacaoDaMatricula === SituacaoDaMatricula.Liberada);
  }

  public async verificarPermissaoAlteracao() {

    const response = await Container.get(AcessarAlteracaoService).processar(this.codigoDoAluno);

    if (response.data.statusEstaLiberadoParaAlteracao) {
      this.situacaoDaMatricula = SituacaoDaMatricula.Liberada;
      if (this.toggleHabilitado) {
        this.habilitarTelaDeAlteracaoDeDisciplinas = true;
      }
    } else {
      this.situacaoDaMatricula = SituacaoDaMatricula.Processando;
      this.habilitarTelaDeAlteracaoDeDisciplinas = false;

      setTimeout(() => {
        this.verificarPermissaoAlteracao();
      }, 5000);
    }
  }

  public async toggleDeAlteracaoEstaHabilitado(): Promise<boolean> {
    const toggleAtivado =
      await this.$features.habilitado(ToggleConstants.HabilitarTelaDeAlteracaoDeDisciplinas);

    return toggleAtivado;
   }

  public async enviarComprovantePorEmail() {
    this.$analytics.track(new EnvioComprovanteEmailEvent());

    try {
      this.enviandoComprovante = true;

      await Container.get(EnviarComprovanteService).processar(this.codigoDoAluno);
      this.exibirModalFeedbackEnvio(
        'Comprovante Enviado',
        'O comprovante com status atual da sua rematrícula foi enviado com sucesso para seu e-mail.',
        'OK',
      );
    } catch (error) {
      this.exibirModalFeedbackEnvio(
        'Ops!',
        'Ocorreu um erro ao enviar o comprovante. Por favor, tente novamente em alguns minutos.',
        'OK',
      );
    } finally {
      this.enviandoComprovante = false;
    }
  }

  public exibirModalFeedbackEnvio(titulo: string, texto: string, botao: string) {
    const opcoes = new OpcoesDeDialogo (
      titulo,
      texto,
      botao,
      '',
    );

    this.$dialogo.abrir(opcoes);
  }
}
</script>