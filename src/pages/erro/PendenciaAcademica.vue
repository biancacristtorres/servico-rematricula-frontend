<template>
  <erro 
  titulo="Ops! Está faltando algo por aqui…"
  texto="Vimos que você está com alguma pendência acadêmica, favor entrar em contato com a secretaria virtual para regularizar a sua situação."
  imagem="pendencia-academica"
  ></erro>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class PendenciaAcademica extends Mixins<ChatMixin>(ChatMixin) {

}
</script>
