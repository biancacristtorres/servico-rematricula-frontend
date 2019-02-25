<template> 
  <v-container class=" box pa-0 pb-2">
    <p v-if="carregando" class="pt-5 pb-5 text-xs-center" id="barra-de-progresso">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </p>
    <v-layout row wrap fill-width>
      <div v-if="deveExibirLista" class="fill-width title">
        <div class="caption pt-2 pb-2 mt-1 mb pl-4">
          <span class="subheading"> Disciplinas sem horário </span>
        </div>
        <v-divider></v-divider>
      
        <v-list dense class="lista">
          <v-list-tile avatar v-for="disciplina in disciplinasSemHorario" :key="disciplina.nomeDisciplina"> 
            <v-list-tile-avatar>
              <v-img class="icone" :src="getImgUrl()"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="body-1">{{ formatarNomeDisciplina(disciplina) }}</span>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-layout>
  </v-container>
</template>

<style lang="stylus" scoped>  
.title
  text-align: left
.fill-width
  width:100%
.icone
  height:32px
  width:32px
.lista
  background: none

</style>

<script lang='ts'>

import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { ResumoActionTypes } from '@/store/resumo/actions';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AcessarAlteracaoService } from '@/services/alteracao/AcessarAlteracaoService';
import { DisciplinaSemHorario } from '@/model/DisciplinaSemHorario';
import { Container } from 'typescript-ioc';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const ResumoNamespace = namespace(StoreNamespaces.RESUMO);

@Component({})
export default class DisciplinasSemHorario extends Vue {
  @ResumoNamespace.Action(ResumoActionTypes.OBTER_NOME_DISCIPLINAS_SEM_HORARIO)
  public obterDisciplinasSemHorario!: (codigoDoAluno: number) => Promise<any>;

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @ResumoNamespace.State
  public disciplinasSemHorario!: string[];

  private carregando: boolean = false;
  private deveExibirLista: boolean = false;

  private get codigoDoAluno(): number {
    return this.usuarioLogado.codigo || 0;
  }

  public async mounted() {
    this.carregando = true;
    try {
      await this.obterDisciplinasSemHorario(this.usuarioLogado.codigo || 0);
    } finally {
      this.carregando = false;
      this.deveExibirLista = this.disciplinasSemHorario.length > 0;
    }
  }

  public getImgUrl() {
    try {
      return require(`../assets/resumo/computer-ead.svg`);
    } catch {
      return '';
    }
  }

  public formatarNomeDisciplina(disciplinaSemHorario: DisciplinaSemHorario) {
    const disciplina = disciplinaSemHorario.nomeDisciplina;
    const equivalente = disciplinaSemHorario.nomeDisciplinaEquivalente;
    let nomeDisciplina = '';

    if (equivalente && disciplina !== equivalente) {
      nomeDisciplina =  `${equivalente} (Eq. à ${disciplina})`;
    } else {
      nomeDisciplina = `${disciplina}`;
    }
    return nomeDisciplina;
  }

}
</script>