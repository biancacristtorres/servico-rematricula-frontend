<template>
  <div class="pr-2">
    <div class="container-tabela">
      <v-container class="box pa-0 caption">
        <v-layout row>
          <v-flex
            class="display-table"
            v-for="cabecalho in cabecalhos"
            :key="cabecalho + '-cabecalho'"
            xs2
          >
            <div class="celula celula-cabecalho display-cell font-weight-bold">{{cabecalho}}</div>
          </v-flex>
        </v-layout>
        <p v-if="carregando" class="pt-5 pb-5 text-xs-center" id="barra-de-progresso">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </p>
        <v-layout row v-for="(horario, i) in horarios" :key="i">
          <v-flex class="display-table" :key="i" xs2>
            <div class="celula pt-2 display-cell font-weight-bold">{{horario.horaInicioFim}}</div>
          </v-flex>
          <v-flex
            v-for="(disciplinasPorDiaDeSemana, i) in horario.disciplinasPorDiaDeSemana"
            :key="i + '-disciplina'"
            xs2
          >
            <v-container class="pa-0 celula" fill-height>
              <v-layout row wrap v-if="disciplinasPorDiaDeSemana">
                <v-flex
                  class="display-table"
                  xs12
                  v-for="(disciplina, i) in disciplinasPorDiaDeSemana"
                  :key="i + '-disciplina-por-semana'"
                >
                  <img
                    v-if="disciplinasPorDiaDeSemana"
                    :style="trianguloDaCorDaDisciplina(disciplina)"
                  >
                  <div class="display-cell pa-2">
                    <v-divider v-if="i > 0"></v-divider>
                    <div class="celula-disciplina">
                      <div v-if="exibirIconeFila(disciplina.status)">
                        <v-icon color="orange" small>restore</v-icon>
                      </div>
                      <div v-if="exibirIconeConfirmada(disciplina.status)">
                        <v-icon color="green" small>check</v-icon>
                      </div>
                      <div v-if="exibirIconeTurmaEspecial(disciplina.status)">
                        <v-icon color="grey darken-1" class="icone-turma-especial" small>mdi-book-open-page-variant</v-icon>
                      </div>
                    </div>
                    <div class="display-table" style="table-layout: fixed; width: 100%">
                      <div class="display-cell">
                        <p class="celula-disciplina" v-html="formatarNomeDisciplina(disciplina)" />
                      </div>
                    </div>
                    <a
                      v-if="disciplina.ePorData"
                      id="link-ver-datas"
                      class="celula-disciplina"
                      @click="abrirModalDatas(disciplina, horario.horaInicioFim)"
                    >Ver Datas</a>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-xs-left pa-0 pt-2">
      <span class="body-2">Legenda:</span>
      <span class="legenda text-xs-left caption pl-3">
        <v-icon color="green" small class="pr-1">check</v-icon>Disciplina Confirmada
      </span>
      <span class="legenda text-xs-left caption pl-3">
        <v-icon color="orange" small class="pr-1">repeat</v-icon>Aguardando Confirmação
      </span>
      <span class="legenda text-xs-left caption pl-3">
        <v-icon color="orange" small class="pr-1">restore</v-icon>Fila de Espera
      </span>
      <span class="legenda text-xs-left caption pl-3">
        <v-icon color="grey darken-1" small class="pr-1">mdi-book-open-page-variant</v-icon>Turma Especial
      </span>
    </p>
  </div>
</template>

<style lang="stylus" scoped>
.box {
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: white;
  min-width: 600px;
}

.celula {
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.celula-cabecalho {
  height: 40px;
}

.display-table {
  display: table;
  width: 100%;
}

.display-cell {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.container-tabela {
  overflow-x: auto;
}

.legenda {
  display: inline-block;
}

.celula-disciplina {
  margin-left: -16px;
  overflow-wrap: break-word;
}
</style>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { ResumoActionTypes } from '@/store/resumo/actions';
import { Horario } from '@/model/Horario';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { StatusDaDisciplina } from '@/common/enum/StatusDaDisciplina';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';
import { GeradorDeCores } from '@/common/utils/GeradorDeCores';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const ResumoNamespace = namespace(StoreNamespaces.RESUMO);

@Component({})
export default class GradeDeHorario extends Vue {
  @ResumoNamespace.Action(ResumoActionTypes.OBTER_RESUMO)
  public obterResumo!: (codigoDoAluno: number) => Promise<any>;

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @ResumoNamespace.State
  public horarios!: Horario[];

  private carregando: boolean = false;
  private cabecalhos: string[] = [
    'Horários',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  public async mounted() {
    this.carregando = true;
    try {
      await this.obterResumo(this.usuarioLogado.codigo || 0);
    } finally {
      this.carregando = false;
    }
  }

  public formatarNomeDisciplina(disciplinaResumo: DisciplinaResumo) {
    const disciplina = disciplinaResumo.nomeDisciplina;
    const equivalente = disciplinaResumo.nomeDisciplinaEquivalente;
    const turma = disciplinaResumo.descricaoTurma;
    let nomeDisciplina = '';

    if (equivalente && disciplina !== equivalente) {
      nomeDisciplina =  `${equivalente} (Eq. à ${disciplina})<br/> (${turma})`;
    } else {
      nomeDisciplina = `${disciplina} (${turma})`;
    }
    return nomeDisciplina;
  }

  public exibirIconeFila(status: StatusDaDisciplina) {
    return status === StatusDaDisciplina.FilaDeEspera;
  }

  public exibirIconeTurmaEspecial(status: StatusDaDisciplina) {
    return status === StatusDaDisciplina.AguardandoConfirmacao;
  }

  public exibirIconeConfirmada(status: StatusDaDisciplina) {
    return status === StatusDaDisciplina.Confirmada;
  }

  public abrirModalDatas(disciplina: DisciplinaResumo, horaInicioFim: string) {
    const opcoes = new OpcoesDeDialogo(
      'Datas das Aulas',
      this.gerarHtmlTextoModal(disciplina, horaInicioFim),
      'Voltar',
      '',
    );

    this.$dialogo.abrir(opcoes);
  }

  public gerarHtmlTextoModal(
    disciplina: DisciplinaResumo,
    horaInicioFim: string,
  ): string {
    // TODO: Criar componente para exibição na modal LDAN-3743
    const texto = (
      '<span><b> Disciplina: ' +
      disciplina.nomeDisciplina +
      '</b></span><br/><br/>'
    )
      .concat(
        '<span> Tipo de Carga Horária: ' +
          disciplina.descricaoTipoCargaHoraria +
          '</span><br/>',
      )
      .concat('<span> Campus: ' + disciplina.campus + '</span><br/>')
      .concat('<span> Turma: ' + disciplina.descricaoTurma + '</span><br/>')
      .concat('<span> Horário: ' + horaInicioFim + '</span><br/><br/>')
      .concat('<span> Datas: </span><br/>')
      .concat(disciplina.datas!.join('<br/>'));
    return texto;
  }

  public trianguloDaCorDaDisciplina(disciplina: DisciplinaResumo) {
    const corDaDisciplina = GeradorDeCores.GerarUmaCorBaseadaNumaString(
      disciplina.nomeDisciplina || '',
    );

    return {
      'width': 0,
      'height': 0,
      'position': 'relative',
      'border-top': `16px solid ${corDaDisciplina}`,
      'border-right': '16px solid transparent',
    };
  }
}
</script>