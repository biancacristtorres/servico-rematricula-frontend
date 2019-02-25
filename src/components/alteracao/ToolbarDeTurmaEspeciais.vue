<template>
  <div class="cabecalho-turmas pa-3">
    <v-icon class="mr-3">
      school
    </v-icon>

    <span class="body-1">
      Turmas especiais
    </span>

    <v-tooltip bottom max-width="300px">
      <v-icon slot="activator" small class="ml-3">
        help
      </v-icon>
      <span>
        A turma especial precisa ter um mínimo de alunos para ser confirmada. 
        Você será confirmado automaticamente, caso isto aconteça.
      </span>
    </v-tooltip>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ToolbarDeTurmaEspeciais extends Vue {}
</script>

<style lang="stylus" scoped>
  .cabecalho-turmas
    display: flex
    span 
      align-self: center
</style>
