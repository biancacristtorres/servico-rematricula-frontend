<template>
  <v-container>
    <v-layout justify-center class="hidden-md-and-up">
      <v-flex xs12 sm8 class="text-xs-center grey--text text--darken-1 mt-4 subheading">
        <iframe style="max-width: 100%" src="https://www.youtube.com/embed/d-mW4beRnoo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-avatar :tile="true" :size="'96px'">
          <img :src="srcCapelo" alt="Capelo">
        </v-avatar>

        <span class="d-block grey--text text--darken-2 title mt-3">Novidades =)</span>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="hidden-sm-and-down">
      <v-flex xs12 sm8 class="text-xs-center grey--text text--darken-1 mt-4 subheading">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/d-mW4beRnoo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="mt-4">
      <v-flex xs12 sm6>
        <v-btn id="continuar" @click.native="redirecionar" block large color="primary">Continuar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ToggleConstants } from '@/common/enum/ToggleConstants';

@Component({})
export default class Inicio extends Vue {

  public async redirecionar() {
    const deveExibirInteresse = await this.$features
      .habilitado(ToggleConstants.HabilitarInteresseDeDisciplinas);

    if (deveExibirInteresse) {
      this.$router.push('/Interesse');
    } else {
      this.$router.push('/AguardandoRematricula');
    }
  }

  public get srcCapelo() {
    return `${process.env.BASE_URL}svg/capelo.svg`;
  }

}
</script>