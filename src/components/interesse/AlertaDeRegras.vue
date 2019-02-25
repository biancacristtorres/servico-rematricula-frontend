<template>
  <v-container v-if="exibirAlertaDeRegras" class="py-0">
    <v-layout class="mt-0 mb-0">
       <v-flex xs12>

        <v-alert 
          id="aviso-de-regras"
          :value="exibirAlertaDeRegras" 
          class="mt-4"
          transition="scale-transition" 
          color="info" 
          icon="info" 
          dismissible
          outline>
          Atenção, o interesse indicado por você nos ajudará à encontrar vagas, porém não garante as mesmas.
        </v-alert>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class AlertaDeRegras extends Vue {

    @Prop()
    public exibirAlertaDeRegras!: boolean;

  }
</script>