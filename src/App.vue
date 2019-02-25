<template>
  <v-app>
    <router-view/>

    <v-dialog v-if="carregando" v-model="carregando" persistent width="300">
      <v-card id="loading-global" color="primary" dark>
        
        <v-card-text>
          Por favor, aguarde. Estamos carregando.
          <v-progress-linear indeterminate color="white" class="mb-0">
          </v-progress-linear>
        </v-card-text>
      
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AlunoGetterTypes } from '@/store/aluno/getters';

const aluno = namespace(StoreNamespaces.ALUNO);

@Component({})
export default class App extends Vue {

  @aluno.Getter(AlunoGetterTypes.ESTA_OBTENDO_INFORMACOES_ALUNO)
  public carregando!: boolean;

}
</script>
