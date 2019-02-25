<template>
  <erro :deveRedirecionarParaOSOL="false"
  titulo="Ops!"
  texto="Não estamos conseguinto te identificar. Aconteceu algo de errado no seu login. Realize seu login e tente novamente."
  imagem="usuario-nao-autenticado"
  ></erro>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class UsuarioNaoAltenticado extends Vue {

}
</script>
