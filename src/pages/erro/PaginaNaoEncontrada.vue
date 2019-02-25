<template>
  <erro 
  titulo="404"
  texto="A página que você procurou não existe"
  imagem="pagina-nao-encontrada"
  ></erro>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class PaginaNaoEncontrada extends Vue {

}
</script>
