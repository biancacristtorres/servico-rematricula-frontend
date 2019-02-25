<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-avatar :tile="true" :size="'96px'">
          <img :src="srcWarning" alt="Alerta">
        </v-avatar>

        <span class="d-block grey--text text--darken-2 title">
          Disciplinas pendentes
        </span>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm8 class="text-xs-center grey--text text--darken-1 mt-3 subheading">
        Atenção. Este interesse não garante vagas no seu próximo módulo,
        porém nos ajudará a buscar vagas nestas disciplinas.
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm6>
        <selecao-de-disciplinas 
          @interesseSolicitado="aoSolicitarInteresse" 
          @alertaEmitido="aoEmitirAlerta">
        </selecao-de-disciplinas>

        <selecao-de-condicao-especial 
          @condicaoSolicitada="aoSolicitarCondicao"
          :quantidadeDeDisciplinasComInteresse="quantidadeDeDisciplinasComInteresse">
        </selecao-de-condicao-especial>

        <alerta-de-regras :exibirAlertaDeRegras="exibirAlertaDeRegras">
        </alerta-de-regras>

        <continuar :condicoes="condicoes" :disciplinas="disciplinas">
        </continuar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import {
  DisciplinaComInteresse,
} from '@/model/DisciplinaComInteresse';
import {
  CondicaoEspecial,
} from '@/common/enum/CondicaoEspecial';
import SelecaoDeDisciplinas from '@/components/interesse/SelecaoDeDisciplinas.vue';
import SelecaoDeCondicaoEspecial from '@/components/interesse/SelecaoDeCondicaoEspecial.vue';
import AlertaDeRegras from '@/components/interesse/AlertaDeRegras.vue';
import Continuar from '@/components/interesse/Continuar.vue';

@Component({
  components: {
    SelecaoDeDisciplinas,
    SelecaoDeCondicaoEspecial,
    AlertaDeRegras,
    Continuar,
  },
})
export default class Interesse extends Vue {
  public condicoes: CondicaoEspecial[] = [];
  public disciplinas: DisciplinaComInteresse[] = [];
  public exibirAlertaDeRegras: boolean = false;

  public get srcWarning() {
    return `${process.env.BASE_URL}svg/warning.svg`;
  }

  public aoSolicitarCondicao(condicoes: CondicaoEspecial[]) {
    this.condicoes = condicoes;
  }

  public aoSolicitarInteresse(disciplinas: DisciplinaComInteresse[]) {
    this.disciplinas = disciplinas;
  }

  private get quantidadeDeDisciplinasComInteresse(): number {
    return this.disciplinas.length;
  }

  public aoEmitirAlerta() {
    this.exibirAlertaDeRegras = true;
  }
}
</script>