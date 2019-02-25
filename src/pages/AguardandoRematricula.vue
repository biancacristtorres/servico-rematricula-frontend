<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-avatar :tile="true" :size="'96px'">
          <img :src="srcCapelo" alt="Capelo">
        </v-avatar>

        <span class="d-block grey--text text--darken-2 title mt-3">
          Agora é só esperar!
        </span>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm8 class="text-xs-center grey--text text--darken-1 mt-4 subheading">
        <p>
          Durante a sua rematrícula, você terá acesso aos seus horários detalhadamente. 
          Estamos analisando as disciplinas que você demonstrou interesse.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';

@Component({})
export default class AguardandoRematricula extends Mixins<ChatMixin>(ChatMixin) {
  public get srcCapelo() {
    return `${process.env.BASE_URL}svg/capelo.svg`;
  }
}
</script>