<template>
  <erro 
  titulo="Ops!"
  texto="Estamos trabalhando em um novo programa de rematrícula para você. 
  Em breve iremos atender mais alunos, e você estará nessa jornada da transformação do país pela educação."
  imagem="soft-launch"
  ></erro>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class RematriculaNaoIniciada extends Vue {

}
</script>
