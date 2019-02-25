<template>
  <v-dialog id="dialogo" v-model="opcoes.exibir" persistent :max-width="500">
    <v-card id="dialogo-conteudo">
      <v-card-title id="titulo" class="headline" primary-title>
        {{ opcoes.titulo }}
      </v-card-title>

      <v-card-text id="texto" v-html="opcoes.texto">
        {{opcoes.texto}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
      
        <v-btn id="rejeitar" color="red" flat v-if="opcoes.textoRejeitar"  @click.native="aoRejeitar">
          {{ opcoes.textoRejeitar }}
        </v-btn>

        <v-btn id="confirmar" color="primary" flat v-if="opcoes.textoConfirmar" @click.native="aoConfirmar">
          {{ opcoes.textoConfirmar }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OpcoesDeDialogo } from '../model/OpcoesDeDialogo';

@Component({})
export default class Dialogo extends Vue {

  @Prop()
  private opcoes!: OpcoesDeDialogo;

  public aoConfirmar() {
    this.$emit('confirmar');
  }

  public aoRejeitar() {
    this.$emit('rejeitar');
  }
}
</script>