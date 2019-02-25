<template>
  <v-container class="pt-0 pb-3 px-0">
    <v-layout class="mt-0">
      <v-flex xs12>
        
        <v-btn id="salvar-alteracoes" 
          @click.native="tentarSalvarAlteracoes" 
          :loading="estaCarregando"
          :disabled="disciplinas.length == 0"
          block 
          large 
          color="blue accent-2 white--text my-0">
          Salvar Alterações
        </v-btn>
      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SalvarAlteracoesService } from '@/services/alteracao/SalvarAlteracoesService';
import { StoreNamespaces } from '@/store';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';
import { Container } from 'typescript-ioc';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';
import AlteracaoPageView, { AlteracaoPageViewType } from '@/model/analytics/AlteracaoPageView';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';
import { TipoErroSalvarAlteracao } from '@/common/enum/TipoErroSalvarAlteracao';
import { Disciplina } from '@/model/Disciplina';

const alteracao = namespace(StoreNamespaces.ALTERACAO);
const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
export default class SalvarAlteracoes extends Vue {

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  private get salvarAlteracoesService(): SalvarAlteracoesService {
    return Container.get(SalvarAlteracoesService);
  }

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @alteracao.State
  public disciplinas!: Disciplina[];

  @alteracao.Action(AlteracaoActionTypes.ALTERANDO_TURMAS)
  public alterandoTurmas!: () => Promise<void>;

  @alteracao.Action(AlteracaoActionTypes.ALTERACAO_FINALIZADA)
  public alteracaoFinalizada!: () => Promise<void>;

  @alteracao.Getter(AlteracaoGetterTypes.ESTA_CARREGANDO)
  private estaCarregando!: boolean;

  public async tentarSalvarAlteracoes() {
    try {
      await this.salvarAlteracoes();
    } catch (error) {
      this.aoOcorrerErroAoSalvar(error.response.data);
    } finally {
      this.alteracaoFinalizada();
    }
  }

  private async salvarAlteracoes(): Promise<void> {
    this.alterandoTurmas();
    this.$analytics.track(new AlteracaoPageView(AlteracaoPageViewType.SUCESSO));

    await this.salvarAlteracoesService.processar(this.codigoDoAluno);
    this.exibirFeedbackSucesso();
  }

  private aoOcorrerErroAoSalvar(tipoDeErro: TipoErroSalvarAlteracao) {
    if (tipoDeErro === TipoErroSalvarAlteracao.QUEBRA_MODULO) {
      this.exibirErroDeQuebraDeModulo();
    } else {
      const mensagem = this.obterMensagemMinimoDeDisciplinas(tipoDeErro);

      if (mensagem !== '') {
        this.exibirErroDeMinimoDeDisciplinas(mensagem);
      }
    }
  }

  private exibirFeedbackSucesso(): void {
    const opcoes = new OpcoesDeDialogo(
      'Sucesso!',
      'As alterações foram solicitadas.',
      'OK',
      '',
    );
    this.$dialogo.abrir(opcoes);
    this.$dialogo.instance.$on('confirmar', () => this.$router.push('/Resumo'));
  }

  private obterMensagemMinimoDeDisciplinas(tipoDeErro: string): string {
    if (tipoDeErro === TipoErroSalvarAlteracao.MINIMO_1_DISCIPLINAS) {
      return 'Você deve escolher no mínimo 1 disciplina para cursar nesse módulo.';
    } else if (tipoDeErro === TipoErroSalvarAlteracao.MINIMO_2_DISCIPLINAS) {
      return 'Você deve escolher no mínimo 2 disciplinas para cursar nesse módulo.';
    } else if (tipoDeErro === TipoErroSalvarAlteracao.MINIMO_3_DISCIPLINAS) {
      return 'Você deve escolher no mínimo 3 disciplinas para cursar nesse módulo.';
    }
    return '';
  }

  private exibirErroDeMinimoDeDisciplinas(mensagem: string): void {
    const opcoes = new OpcoesDeDialogo(
      'Mínimo de Disciplinas',
      mensagem,
      'OK',
      '',
    );
    this.$dialogo.abrir(opcoes);
  }

  private exibirErroDeQuebraDeModulo(): void {
    const opcoes = new OpcoesDeDialogo(
      'Quebra de Módulo',
      'Esta turma faz parte de seu módulo. ' +
      'Para evitar problemas, você deve se desmatricular de todas disciplinas do seu módulo atual.',
      'OK',
      '',
    );
    this.$dialogo.abrir(opcoes);
  }
}
</script>
