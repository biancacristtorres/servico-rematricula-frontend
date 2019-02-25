<template>

</template>

<script lang='ts'>
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
import { ChatMixin } from '@/mixin/ChatMixin';

@Component({})
export default class ChatMixinDummy extends Mixins<ChatMixin>(ChatMixin) {}
</script>