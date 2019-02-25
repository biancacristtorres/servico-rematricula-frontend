<template>
  <v-container class="px-2 pb-0">
    <p v-if="carregando" class="mt-5 text-xs-center" id="barra-de-progresso">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </p>

    <v-layout v-else-if="disciplinas.length == 0" class="white fill">
      <v-flex md1 pa-3>
        <v-icon large>
          error_outline
        </v-icon>
      </v-flex>
      <v-flex md10 pa-3>
        <span id="mensagem" body-1>
          Não existem disciplinas em oferta neste momento.
        </span>
      </v-flex>
    </v-layout>

    <v-layout v-else class="caption">
      <v-flex xs12>
        <v-expansion-panel>
          <v-expansion-panel-content
            lazy
            v-for="disciplina in disciplinas"
            :key="disciplina.codigo"
            :class="classeDoTitulo(disciplina.situacao)"
            :style="corDaDisciplina(disciplina.nome, disciplina.situacao)">

            <div slot="header" class="disciplina-disponivel body-1" :id="`disciplina-${ disciplina.codigo }`">
              {{ disciplina.nome }}
              <span class="separador" v-if="disciplina.modulo"> • </span>
              <span class="modulo" v-if="disciplina.modulo"> (Módulo {{disciplina.modulo}})</span>
            </div>

            <selecao-de-turmas :codigoDaDisciplina="disciplina.codigo">
            </selecao-de-turmas>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="stylus" scoped>
.modulo
  color: #757575
</style>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { Disciplina } from '@/model/Disciplina';
import { SituacaoDaDisciplina } from '@/common/enum/SituacaoDaDisciplina';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';
import SelecaoDeTurmas from '@/components/alteracao/SelecaoDeTurmas.vue';
import { GeradorDeCores } from '@/common/utils/GeradorDeCores';

const alteracao = namespace(StoreNamespaces.ALTERACAO);
const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);

@Component({
  components: {
    SelecaoDeTurmas,
  },
})
export default class DisciplinasDisponiveis extends Vue {
  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @alteracao.State
  public disciplinas!: Disciplina[];

  @alteracao.Action(AlteracaoActionTypes.DISCIPLINAS)
  public preencherDisciplinasDisponiveis!: (codigoDoAluno: number) => Promise<void>;

  private carregando: boolean = true;

  public mounted() {
    this.preencherDisciplinasDisponiveis(this.usuarioLogado.codigo || 0)
      .then(this.aoTerminarDeCarregar);
  }

  public aoTerminarDeCarregar() {
    this.carregando = false;
  }

  public classeDoTitulo(status: SituacaoDaDisciplina): string {
    return this.eMatriculada(status) ? 'disciplina-confirmada' : '';
  }

  public eMatriculada(status: SituacaoDaDisciplina): boolean {
    return  status === SituacaoDaDisciplina.Confirmada ||
            status === SituacaoDaDisciplina.Solicitada ||
            status === SituacaoDaDisciplina.Reservada;
  }

  public corDaDisciplina(nomeDaDisciplina: string, status: SituacaoDaDisciplina ) {

    if (this.eMatriculada(status)) {
      const corDaDisciplina = GeradorDeCores.GerarUmaCorBaseadaNumaString(nomeDaDisciplina);

      return {
        'border-left': '4px solid '.concat(corDaDisciplina),
      };
    }
    return '';
  }
}
</script>