<template>
  <v-menu v-model="menu" 
    :close-on-click="false"
    :close-on-content-click="false"
    bottom
    offset-y>
    <v-btn id="exibir-filtro" flat class="blue--text" slot="activator">
      <v-icon left dark color="blue">
        mdi-filter
      </v-icon>
      Filtrar
    </v-btn>

    <v-card>
     <v-card-text>
       <v-radio-group v-model="filtro.exibirTurnosDiferentes">
         <div slot="label" class="primary--text">
           Turno:
          </div>

         <v-radio :value="false">
           <div slot="label">
             Apenas no meu turno
            </div>
         </v-radio>

         <v-radio :value="true">
           <div slot="label">
             Todos turnos disponíveis
            </div>
         </v-radio>
       </v-radio-group>
     </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn flat @click="menu = false">Fechar</v-btn>
      <v-btn id="aplicar-filtro" color="primary" flat @click="aplicarFiltro()">
        Aplicar
      </v-btn>
    </v-card-actions>
   </v-card>
  </v-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Filtro } from '@/model/Filtro';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AlteracaoActionTypes } from '@/store/alteracao/actions';

const alteracao = namespace(StoreNamespaces.ALTERACAO);

@Component({})
export default class FiltroDeTurma extends Vue {
  public filtro: Filtro = new Filtro();
  public menu: boolean = false;

  @alteracao.Action(AlteracaoActionTypes.ALTERAR_FILTRO)
  public alterarFiltro!: (filtro: Filtro) => Promise<void>;

  public aplicarFiltro(): void {
    this.alterarFiltro(this.filtro);
    this.menu = false;
  }
}
</script>
