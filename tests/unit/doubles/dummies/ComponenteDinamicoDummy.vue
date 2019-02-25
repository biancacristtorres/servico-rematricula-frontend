<template>
  <div id="componente-dinamico-dummy"></div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ModelDeDialogoDinamico } from '@/model/ModelDeDialogoDinamico';

@Component({})
export default class ComponenteDinamicoDummy extends Vue {

  @Prop()
  public model!: ModelDeDialogoDinamico; 

}
</script>
