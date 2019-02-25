<template>
  <table v-if="possuiEquivalenciaDoisPorUm">
    <tbody>
      <tr>        
        <td>
          <v-layout row align-center ow fill-height>            
            <v-icon color="red" class="mr-1">warning</v-icon>
            <label :id="idDaMensagemEquivalenciaDoisPorUm" class="body-1">              
              Qualquer alteração nesta disciplina só pode ser realizada pela Secretaria Virtual.
            </label>
          </v-layout>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class NenhumaOpcao extends Vue {

  @Prop({})
  public possuiEquivalenciaDoisPorUm!: boolean;

  @Prop({})
  public codigoDaDisciplina!: number;

  private get idDaMensagemEquivalenciaDoisPorUm(): string {
    return `mensagem-equivalencia-dois-por-um-${ this.codigoDaDisciplina }`;
  }
}
</script>

<style lang="stylus" scoped>
  table
    width: 100%
    border-collapse: collapse
    td.td-radio
      width: 80px
    td
      padding 16px
      border: 1px solid #e0e0e0

</style>
