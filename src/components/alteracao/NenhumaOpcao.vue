<template>
  <table v-if="possuiTurmas(this.codigoDaDisciplina)">
    <tbody>
      <tr>
        <td class="td-radio text-xs-center">
          <v-progress-circular v-if="estaCarregando"
              indeterminate
              class="aguardando-alteracao"
              color="primary"
              size="16">
            </v-progress-circular>

          <v-icon v-else
              color="primary" 
              small
              :id="idDoRadio"
              :value="estaCheckado"
              @click="aoSelecionar()">

              {{ iconeDoRadio }}
          </v-icon>
        </td>
        <td>
          <label :for="idDoRadio">
            Nenhuma das opções 
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';
import { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
const store = namespace(StoreNamespaces.ALTERACAO);

@Component({})
export default class NenhumaOpcao extends Vue {

  @Prop({})
  public codigoDaDisciplina!: number;

  @store.Getter(AlteracaoGetterTypes.POSSUI_TURMAS)
  private possuiTurmas!: (codigoDaDisciplina: number) => boolean;

  @store.Getter(AlteracaoGetterTypes.TURMA_ATUAL)
  private turmaAtual!: (codigoDaDisciplina: number) => boolean;

  @store.Getter(AlteracaoGetterTypes.ESTA_CARREGANDO)
  private estaCarregando!: boolean;

  private get idDoRadio(): string {
    return `nenhuma-opcao-${ this.codigoDaDisciplina }`;
  }

  private get estaCheckado(): boolean {
    return !this.turmaAtual(this.codigoDaDisciplina);
  }

  private get iconeDoRadio(): string {
    return this.estaCheckado ? 'radio_button_checked' : 'radio_button_unchecked';
  }

  public aoSelecionar(): void {
    this.$emit('remover-turma', this.codigoDaDisciplina);
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
