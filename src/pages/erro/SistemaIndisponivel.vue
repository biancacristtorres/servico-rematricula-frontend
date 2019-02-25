<template>
  <erro 
  titulo="Algo de errado não está certo…"
  texto="Aconteceu algo de errado, mas não se preocupe que já estamos tentando resolver. Clique no botão abaixo para retornar à pàgina inicial do SOL. "
  imagem="sistema-indisponivel"
  ></erro>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class SistemaIndisponivel extends Vue {

}
</script>
