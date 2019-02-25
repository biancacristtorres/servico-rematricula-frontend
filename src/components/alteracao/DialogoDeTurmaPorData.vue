<template>
  <div id="dialogo-de-turma-por-data">
    <p class="body-2 mb-0">
        {{ model.nomeDaDisciplina }}
    </p>
    <p class="body-2 pt-0">
        Turma: {{ model.descricaoDaTurma }}
    </p>
    <div v-for="horario in model.horariosDeTurmaPorData" :key="horario.codigoDiaSemana">
      <p class="body-2">
        {{ diaDaSemana(horario.codigoDiaSemana) }}:
      </p>

      <ul class="pl-0 mb-3">
        <li v-for="(data, indice) in horario.datasParaExibicao" :key="indice" class="body-1">
          {{ data }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HorariosDeTurmaPorData } from '@/model/HorariosDeTurmaPorData';

@Component({})
export default class DialogoDeTurmaPorData extends Vue {

  @Prop()
  public model!: HorariosDeTurmaPorData;

  public diaDaSemana(codigoDiaSemana: number): string {
    switch (codigoDiaSemana) {
      case 2:
        return 'Segunda-feira';
      case 3:
        return 'Terça-feira';
      case 4:
        return 'Quarta-feira';
      case 5:
        return 'Quinta-feira';
      case 6:
        return 'Sexta-feira';
      case 7:
        return 'Sábado';
      default:
        return '';
    }
  }
}
</script>

<style lang="stylus" scoped>
  #dialogo-de-turma-por-data ul
    list-style-type none
</style>
