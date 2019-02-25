<template>
  <div class="container-tabela">
    <table id="disciplina-com-turmas" cellspacing="0" cellpadding="0">
      <thead id="turmas-cabecalho"  class="primary white--text text-xs-center">
        <tr>
          <th></th>
          <th class="coluna-disciplina" v-if="eDisciplinaEquivalente">
            Disciplina
          </th>
          <th>Dia e Horário</th>
          <th>Campus</th>
          <th>Curso</th>
          <th>Turma</th>
          <th>Vagas</th>
          <th v-if="eTurmaEspecial">
            Confirmados
          </th>
        </tr>
      </thead>

      <tbody v-for="(turma, i) in turmas" :key="gerarKey('tp', i)">

        <tr class="horario-turma text-xs-center">

          <td :rowspan="rowspan(turma)" class="td-radio" v-if="toggleHabilitado">
            
            <template v-if="podeSolicitarAviso(turma)">
              <v-btn flat 
                light
                small
                color="info" 
                class="avise-me"
                @click="solicitarAviso(turma)">
                Avise-me
              </v-btn>
            </template>

            <selecionador-de-turma v-else 
              :codigoDaDisciplina="codigoDaDisciplina" 
              :nomeDaDisciplina="nomeDaDisciplina"
              :desabilitado="possuiEquivalenciaDoisPorUm"
              :turma="turma">
            </selecionador-de-turma>
          </td>

          <td :rowspan="rowspan(turma)" class="td-radio" v-else>
            
            <template v-if="podeSolicitarAviso(turma)">
              <v-btn flat 
                light
                small
                color="info" 
                class="avise-me"
                @click="solicitarAviso(turma)"
                :disabled="possuiEquivalenciaDoisPorUm">
                Avise-me
              </v-btn>
            </template>

            <template v-else>
              <v-progress-circular v-if="estaCarregando"
                indeterminate
                class="aguardando-alteracao"
                color="primary"
                size="16">
              </v-progress-circular>

              <v-icon v-else
                class="selecionar-turma"
                color="primary" 
                small
                :id="`turma-${ turma.codigo }`" 
                :value="turma.eTurmaAtual" 
                @click="aoSelecionar(turma)"
                :disabled="possuiEquivalenciaDoisPorUm">

                {{ iconeDoRadio(turma) }}
              </v-icon>
            </template>
          </td>

          <td v-if="eDisciplinaEquivalente"
            :rowspan="rowspan(turma)">
            {{ turma.nomeDaDisciplina }}
          </td>

          <td>
            <template v-if="turma.eTurmaPorData">
              <a href="#" 
                class="turmas-por-data"
                @click="abrirDatas(turma.descricao, turma.horariosDeTurmaPorData)">
                Ver Datas
              </a>
            </template>

            <template v-else>
              <li v-for="(horario, i) in turma.horariosParaExibicao" 
                :key="gerarKey('hp', i)" 
                class="turmas-semanais">
                {{ horario }}
              </li>
            </template>

            <p class="ma-0">
              ({{ turma.tipoCargaHoraria }})
            </p>
          </td>
          <td>
            {{ turma.campus }}
          </td>
          <td>
            {{ turma.curso }}
          </td>
          <td>
            {{ turma.descricao }}
          </td>
          <td>
            {{ textoDasVagas(turma, turma.vagas) }}
          </td>
          <td v-if="eTurmaEspecial">
            <p class="ma-0">
              Confirmados: {{ turma.numeroDeReservas }}
            </p>
            <p class="ma-0">
              Mínimo: {{ turma.minimoParaConfirmacao }} 
            </p>
          </td>
        </tr>

        <tr 
          v-for="(turmaComplementar, i) in turma.complementares" 
          :rowspan="rowspan(turma)"
          :key="gerarKey('tc', i)"
          class="horario-turma-complementar text-xs-center">
          
          <td>
            <template v-if="turmaComplementar.eTurmaPorData">
              <a href="#" 
                class="turmas-por-data" 
                @click="abrirDatas(turmaComplementar.descricao, turmaComplementar.horariosDeTurmaPorData)">
                Ver Datas
              </a>
            </template>

            <template v-else>
              <li v-for="(horario, i) in turmaComplementar.horariosParaExibicao" :key="gerarKey('hp', i)">
                {{ horario }}
              </li>
            </template>

            <p class="ma-0">
              ({{ turmaComplementar.tipoCargaHoraria }})
            </p>
          </td>
          <td>
            {{ turmaComplementar.campus }}
          </td>
          <td>
            {{ turmaComplementar.curso }}
          </td>
          <td>
            {{ turmaComplementar.descricao }}
          </td>
          <td>
            {{ textoDasVagas(turma, turmaComplementar.vagas) }}
          </td>
          <td v-if="eTurmaEspecial">
            <p class="ma-0">
              Confirmados: {{ turma.numeroDeReservas }}
            </p>
            <p class="ma-0">
              Mínimo: {{ turma.minimoParaConfirmacao }} 
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { Container } from 'typescript-ioc';
import { OpcoesDeDialogoDinamico } from '@/model/OpcoesDeDialogoDinamico';
import { HorariosDeTurmaPorData } from '@/model/HorariosDeTurmaPorData';
import { HorarioPorData } from '@/model/HorarioPorData';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Turma } from '@/model/Turma';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { Periodicidade } from '@/common/enum/Periodicidade';
import {
  SelecaoDeTurmaRequest,
} from '@/services/alteracao/request/SelecaoDeTurmaRequest';
import {
  RequestDeSelecaoDeTurmaService,
} from '@/services/alteracao/RequestDeSelecaoDeTurmaService';
import {
  ControladorDeVagasService,
} from '@/services/alteracao/ControladorDeVagasService';
import {
  SolicitacaoDeAvisoService,
} from '@/services/alteracao/SolicitacaoDeAvisoService';
import SelecionadorDeTurma from '@/components/alteracao/SelecionadorDeTurma.vue';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { ToggleConstants } from '@/common/enum/ToggleConstants';

const aluno = namespace(StoreNamespaces.ALUNO);
const store = namespace(StoreNamespaces.ALTERACAO);

@Component({
  components: {
    SelecionadorDeTurma,
  },
})
export default class Turmas extends Vue {

  private get requestDeSelecaoDeTurmaService(): RequestDeSelecaoDeTurmaService {
    return Container.get(RequestDeSelecaoDeTurmaService);
  }

  private get codigoDoAluno(): number {
    return this.informacoesAluno.codigoAluno || 0;
  }

  public get controladorDeVagasService(): ControladorDeVagasService {
    return Container.get(ControladorDeVagasService);
  }

  public get solicitacaoDeAvisoService(): SolicitacaoDeAvisoService {
    return Container.get(SolicitacaoDeAvisoService);
  }

  @Prop()
  public codigoDaDisciplina!: number;

  @Prop()
  public nomeDaDisciplina!: string;

  @Prop()
  public eDisciplinaEletiva!: boolean;

  @Prop()
  public eTurmaEspecial!: boolean;

  @Prop()
  public eDisciplinaEquivalente!: boolean;

  @Prop()
  public possuiEquivalenciaDoisPorUm!: boolean;

  @Prop()
  public turmas!: Turma[];

  @aluno.State
  public informacoesAluno!: InformacoesAluno;

  private toggleHabilitado: boolean = true;

  @store.Getter(AlteracaoGetterTypes.ESTA_CARREGANDO)
  private estaCarregando!: boolean;

  public async mounted() {
    this.toggleHabilitado = await this.toggleDoSelecionadorEstaHabilitado();
  }

  public rowspan(turma: Turma): number {
    return (turma.complementares || []).length + 1;
  }

  public gerarKey(padrao: string, indice: number) {
    return `${padrao}-${indice}`;
  }

  public iconeDoRadio(turma: Turma): string {
    return turma.eTurmaAtual ? 'radio_button_checked' : 'radio_button_unchecked';
  }

  public textoDasVagas(turma: Turma, numeroDeVagas: number): string {
    if (!this.podeSolicitarAviso(turma)) {
      return numeroDeVagas < 0 ? `Fila de espera (${ numeroDeVagas * -1 })` : `${ numeroDeVagas }`;
    }

    return 'Sem vagas';
  }

  public async toggleDoSelecionadorEstaHabilitado(): Promise<boolean> {
    const toggleAtivado =
      await this.$features.habilitado(ToggleConstants.ExibirNovoSelecionadorDeTurmas);

    return toggleAtivado;
   }


  public abrirAlertaTurmaSemestral(): Promise<any> {

    const opcoes = new OpcoesDeDialogo(
      'Atenção',
      'Por ser aluno do regime anual com DP ou ADP disponível apenas no regime semestral, fique atento! '
      + 'A disciplina deverá ser paga mesmo após ter o resultado dela no fim do semestre, ou seja, o pagamento '
      + 'se estenderá até dezembro. Deseja continuar?',
      'Sim',
      'Cancelar',
    );
    return this.$dialogo.abrir(opcoes);

  }

  private abrirDatas(descricaoDaTurma: string, horariosDeTurmaPorData: HorarioPorData[]): void {
    const opcoes = new OpcoesDeDialogoDinamico();
    opcoes.titulo = 'Data das aulas';
    opcoes.textoConfirmar = 'Voltar';
    opcoes.componente = 'alteracao/DialogoDeTurmaPorData.vue';
    opcoes.modelDoComponente = new HorariosDeTurmaPorData(
      this.nomeDaDisciplina, descricaoDaTurma, horariosDeTurmaPorData,
    );

    this.$dialogo.abrirDialogoDinamico(opcoes);
  }

  private eAlunoAnualComTurmaSemestral(codigoPeriocididadeTurma: number): boolean {

    return (this.informacoesAluno.codigoMarca === 3 &&
        (this.informacoesAluno.codigoPeriodicidade === Periodicidade.Anual
          && codigoPeriocididadeTurma === Periodicidade.Semestral));
  }

  private aoSelecionar(turma: Turma): void {

    if (this.eAlunoAnualComTurmaSemestral(turma.codigoPeriodicidade)) {

      this.abrirAlertaTurmaSemestral()
        .then(() => {
          this.prosseguirComSelecaoDeTurma(turma);
        });
    } else {
      this.prosseguirComSelecaoDeTurma(turma);
    }
  }

  private obterRequestDeSelecaoDeTurma(turma: Turma): SelecaoDeTurmaRequest {
    return this.requestDeSelecaoDeTurmaService
      .obterPor(this.codigoDaDisciplina, this.nomeDaDisciplina, turma);
  }

  private prosseguirComSelecaoDeTurma(turma: Turma): void {
    const request = this.obterRequestDeSelecaoDeTurma(turma);
    this.$emit('alterar-turma', request, turma);
  }

  private async solicitarAviso(turma: Turma): Promise<void> {
    const request = this.obterRequestDeSelecaoDeTurma(turma);
    await this.solicitacaoDeAvisoService.processar(request, this.codigoDoAluno);
    this.mostrarFeedbackDoAviseMe();
  }

  private mostrarFeedbackDoAviseMe(): void {
    const opcoes = new OpcoesDeDialogo(
      'Sucesso!',
      'Enviaremos um e-mail para você, caso abra uma vaga nesta turma.',
      'OK',
      '',
    );

    this.$dialogo.abrir(opcoes);
  }

  private podeSolicitarAviso(turma: Turma): boolean {
    return this.controladorDeVagasService.podeSolicitarAviso(turma);
  }
}
</script>

<style lang="stylus" scoped>
  .container-tabela
    overflow-x:auto

  table
    width: 100%
    border-collapse: collapse
    thead 
      th
        padding: 8px
      th:not(:last-child)
        border-right: 1px solid #e0e0e0
    tbody
      tr
        border-bottom: 1px solid #e0e0e0
      td
        padding: 8px
      td.td-radio
        min-width: 80px
      td:not(:last-child)
        border-right: 1px solid #e0e0e0
   
   .coluna-disciplina
    width: 20%    
</style>
