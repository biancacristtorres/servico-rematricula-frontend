<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
        <acoes></acoes>
        <grade-de-horario></grade-de-horario>
        <disciplinas-sem-horario></disciplinas-sem-horario>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>

import { Vue } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';

import GradeDeHorario from '@/components/resumo/GradeDeHorario.vue';
import Acoes from '@/components/resumo/Acoes.vue';
import DisciplinasSemHorario from '@/components/resumo/DisciplinasSemHorario.vue';

@Component({
  components: {
    GradeDeHorario,
    Acoes,
    DisciplinasSemHorario,
  },
})

export default class Resumo extends Mixins<ChatMixin>(ChatMixin) {
}

</script>