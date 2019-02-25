<template>
  <erro 
  titulo="Ops! Vimos que você possui valores em aberto."
  texto="Por isso, sua rematrícula está indisponível. Mas fique tranquilo! Acesse a tela inicial do SOL Aluno e converse com o EDU. Basta digitar “pendencia financeira”, assim conseguimos resolver juntos."
  imagem="pendencia-financeira"
  ></erro>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class PendenciaAcademica extends Mixins<ChatMixin>(ChatMixin) {

}
</script>
