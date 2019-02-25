<template>
  <erro 
    :deveRedirecionarParaOSOL="false"
    titulo="Eita!"
    texto="Encontramos um problema no sistema mas estamos resolvendo agora mesmo. Não se preocupe, em breve tudo estará funcionando novamente."
    imagem="sistema-indisponivel">
  </erro>  
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Erro from '@/components/Erro.vue';

@Component({components: { Erro }})
export default class ErroDeSistema extends Vue {
}
</script>
