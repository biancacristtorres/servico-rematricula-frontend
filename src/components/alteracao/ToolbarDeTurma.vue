<template>
  <div class="cabecalho-turmas pa-3">
    <v-icon class="mr-3">
      school
    </v-icon>

    <span class="body-1">
      Turmas disponíveis
    </span>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ToolbarDeTurma extends Vue {}
</script>

<style lang="stylus" scoped>
  .cabecalho-turmas
    display: flex
    span 
      align-self: center
</style>
