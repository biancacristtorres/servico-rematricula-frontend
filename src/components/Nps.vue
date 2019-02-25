<template>
<v-snackbar :value="true" :timeout="0" bottom color="secondary">
  Avalie sua rematrícula
  <v-btn id="clique-aqui" @click="abrir" flat>
    Clique aqui
    <v-dialog @update:returnValue="limparNps" v-model="mostrarNPS" width="432px">
      <v-card>
        <v-img :src="require('./assets/nps/word-of-mouth.png')"></v-img>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <p class="text-xs-center pt-2 title text--grey">{{ texto }}</p>
          <v-layout class="text-xs-center" row justify-space-between>
            <v-flex xs2>
              <v-img :style="`opacity: ${ avaliacaoRuim ? 1 : 0.4 }`" :src="imagemNps('face-bad')"></v-img>
            </v-flex>
            <v-flex xs2>
              <v-img :style="`opacity: ${ avaliacaoMediana ? 1 : 0.4 }`" :src="imagemNps('face-indifference')"></v-img>
            </v-flex>
            <v-flex xs2>
              <v-img :style="`opacity: ${ avaliacaoBoa ? 1 : 0.4}`" :src="imagemNps('face-loveit')"></v-img>
            </v-flex>
          </v-layout>
          <v-radio-group :value="nps" @change="alterarNPS" row>
            <v-container grid-list-md pa-0>
              <v-layout row wrap justify-space-around>
                <v-flex v-for="i in 10" :key="`1${i}`" xs1>
                  <v-radio color="primary" :ripple="false" :value="i"></v-radio>
                  <span class="subheading radio-label">{{ i }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-radio-group>
          <v-textarea v-model="observacoes" class="nps-observacoes pa-3" name="nps-observacoes" placeholder="Comentário (opcional)" rows="4"></v-textarea>
          <p class="text-xs-center pt-3">
            <v-btn :disabled="nps < 1" color="primary" class="botao-enviar" @click="votar">Enviar</v-btn>
          </p>
        </div>
      </v-card>
    </v-dialog>
  </v-btn>
  </v-snackbar>
</template>

<style lang="stylus" scoped>
.nps-observacoes
  border-radius: 2px
  border: solid 1px #dedede

.radio-label
  padding-left: 7px

.botao-enviar
  width: 192px
  color: primary
</style>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import NpsPageViewEvent from '@/model/analytics/NpsPageViewEvent';
import NpsEnvioEvent, { NpsEnvioCategory } from '@/model/analytics/NpsEnvioEvent';
import { OpcoesDeDialogo } from '@/model/OpcoesDeDialogo';

@Component({})
export default class Nps extends Vue {
  public mostrarNPS: boolean = false;
  public nps: number = 0;
  public observacoes: string = '';

  public texto: string = `Você indicaria a nova rematrícula para um(a) amigo(a)?`;
  public imagemNps(nomeImagem: string) {
    return require(`./assets/nps/${nomeImagem}.svg`);
  }

  public get avaliacaoRuim() {
    return this.nps <= 4 && this.nps !== 0;
  }

  public get avaliacaoMediana() {
    return this.nps > 4 && this.nps < 9;
  }

  public get avaliacaoBoa() {
    return this.nps >= 9;
  }

  public abrir() {
      this.$analytics.track(new NpsPageViewEvent(false));
      this.mostrarNPS = true;
  }

  public async votar() {
    this.$analytics.track(new NpsEnvioEvent(NpsEnvioCategory.COMENTARIO, this.nps, this.observacoes));
    this.$analytics.track(new NpsEnvioEvent(NpsEnvioCategory.NOTA, this.nps, this.observacoes));

    this.limparNps();

    this.exibirModalFeedbackEnvio('Avaliação Enviada',
        'Sua avaliação foi enviada com sucesso. Muito obrigado pelo Feedback! :)',
        'OK');

    this.$analytics.track(new NpsPageViewEvent(true));
  }

  public limparNps() {
    this.mostrarNPS = false;
    this.nps = 0;
    this.observacoes = '';
  }

  public exibirModalFeedbackEnvio(titulo: string, texto: string, botao: string) {
    const opcoes = new OpcoesDeDialogo (
      titulo,
      texto,
      botao,
      '',
    );

    this.$dialogo.abrir(opcoes);
  }

  public alterarNPS(valor: number) {
    this.nps = valor;
    this.$analytics.track(new NpsEnvioEvent(NpsEnvioCategory.CLIQUE, this.nps, ''));
  }
}
</script>