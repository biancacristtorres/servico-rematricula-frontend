<template>
    <v-progress-circular v-if="estaCarregando"
      indeterminate
      class="aguardando-alteracao"
      color="primary"
      size="16">
    </v-progress-circular>
    <v-icon v-else @click="alterarMatricula()" color="secondary" :id="idDoSelecionador" :disabled="desabilitado">
      {{iconeDeSelecao}}
    </v-icon>
</template>

<script lang='ts'>
import { Container } from 'typescript-ioc';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { Turma } from '@/model/Turma';
import { AlteracaoRequest } from '@/services/alteracao/request/AlteracaoRequest';
import { AlertasDeAlteracaoRequest } from '@/services/alteracao/request/AlertasDeAlteracaoRequest';
import { AlertasDeAlteracaoResponse } from '@/services/alteracao/response/AlertasDeAlteracaoResponse';
import {
  ConcluirAlteracaoDeSucessoActionRequest,
} from '@/store/alteracao/request/ConcluirAlteracaoDeSucessoActionRequest';
import { AlteracaoResponse } from '@/services/alteracao/response/AlteracaoResponse';
import { AlteracaoDeMatriculaService } from '@/services/alteracao/AlteracaoDeMatriculaService';
import { AlertasDeAlteracaoService } from '@/services/alteracao/AlertasDeAlteracaoService';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { InformacoesAluno } from '@/model/InformacoesAluno';

const aluno = namespace(StoreNamespaces.ALUNO);
const alteracao = namespace(StoreNamespaces.ALTERACAO);

@Component({})
export default class SelecionadorDeTurma extends Vue {

  @Prop()
  public turma!: Turma;

  @Prop()
  public codigoDaDisciplina!: number;

  @Prop()
  public nomeDaDisciplina!: string;

  @Prop()
  public desabilitado!: boolean;

  public get iconeDeSelecao(): string {
    return this.turma.eTurmaAtual ? 'check_circle' : 'panorama_fish_eye';
  }

  public get idDoSelecionador(): string {
    return `turma-${ this.turma.codigoUnico }`;
  }

  public get alteracaoRequest(): AlteracaoRequest {
    return new AlteracaoRequest(this.turma, this.codigoDoAluno, this.codigoDaDisciplina, this.nomeDaDisciplina);
  }

  public get alertasDeAlteracaoRequest(): AlertasDeAlteracaoRequest {
    return new AlertasDeAlteracaoRequest(this.turma, this.informacoesAluno);
  }

  private get codigoDoAluno(): number {
    return this.informacoesAluno.codigoAluno || 0;
  }

  @aluno.State
  public informacoesAluno!: InformacoesAluno;

  @alteracao.Action(AlteracaoActionTypes.CONCLUIR_ALTERACAO_DE_SUCESSO)
  private concluirAlteracaoDeSucesso!:
    (request: ConcluirAlteracaoDeSucessoActionRequest) => Promise<void>;

  @alteracao.Action(AlteracaoActionTypes.ALTERANDO_TURMAS)
  private alterandoTurmas!: () => Promise<void>;

  @alteracao.Action(AlteracaoActionTypes.ALTERACAO_FINALIZADA)
  private alteracaoFinalizada!: () => Promise<void>;

  @alteracao.Getter(AlteracaoGetterTypes.ESTA_CARREGANDO)
  private estaCarregando!: boolean;

  public async alterarMatricula(): Promise<void> {
    this.alterandoTurmas();

    if (await this.podeProcessarAlteracao()) {
      this.tratar(await this.processarAlteracao());
    }

    this.alteracaoFinalizada();
  }

  public async podeProcessarAlteracao(): Promise<boolean> {
    let podeProcessarAlteracao: boolean = true;
    const response = this.obterAlertasDeAlteracao();

    if (response.existemAlertasParaExibicao) {
      try {
        await this.abrirAlerta(response.alertas);
      } catch (error) {
        podeProcessarAlteracao = false;
      }
    }

    return podeProcessarAlteracao;
  }

  public async processarAlteracao(): Promise<AlteracaoResponse> {
    const servico = Container.get(AlteracaoDeMatriculaService) as AlteracaoDeMatriculaService;
    return await servico.processar(this.alteracaoRequest);
  }

  public obterAlertasDeAlteracao(): AlertasDeAlteracaoResponse {
    const servico = Container.get(AlertasDeAlteracaoService) as AlertasDeAlteracaoService;

    return servico.obterAlertasAlteracao(this.alertasDeAlteracaoRequest);
  }

  public abrirAlerta(mensagens: string[]): Promise<any> {
    const opcoes = new OpcoesDeDialogo(
      'Atenção',
      this.formatarMensagens(mensagens),
      'Sim',
      'Cancelar',
    );
    return this.$dialogo.abrir(opcoes);

  }

  public formatarMensagens(mensagens: string[]): string {
    return mensagens[0];
  }

  public tratar(response: AlteracaoResponse): void {
    if (response.sucesso) {

      this.concluirAlteracaoDeSucesso(new ConcluirAlteracaoDeSucessoActionRequest(
              this.codigoDaDisciplina,
              this.turma.codigoUnico,
              this.turma.eTurmaAtual,
              response.miniGrade,
            ));
    } else {
      this.$dialogo.abrir(response.opcoesDeDialogo);
    }
  }

}
</script>
