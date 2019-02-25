<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card flat>
          <v-card-title primary-title class="text-xs-left pb-0 body-2">
            Tem interesse em fazer alguma dessas disciplinas neste módulo?
          </v-card-title>

          <v-card-text class="py-0 px-0">
            <v-container fluid class="px-3 pt-0">

              <template v-for="disciplina in disciplinas">
                <v-checkbox class="disciplinas-pendentes" color="primary" v-model="disciplinasSelecionadas"
                  hide-details :key="disciplina.codigo" :id="`disciplina-${disciplina.codigo}`" :value="disciplina"
                  @click.capture="aoCheckarDisciplina">

                  <div slot="label" class="body-1 black--text">
                    {{ disciplina.nome }}
                  </div>
                </v-checkbox>
              </template>

            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang='ts'>
  import {
    Component,
    Prop,
    Watch,
    Vue,
  } from 'vue-property-decorator';
  import {
    namespace,
  } from 'vuex-class';
  import {
    StoreNamespaces,
  } from '@/store';
  import {
    InteresseActionTypes,
  } from '@/store/interesse/actions';
  import {
    ManifestarInteresseRequest,
  } from '@/store/interesse/request/ManifestarInteresseRequest';
  import {
    DisciplinaComInteresse,
  } from '@/model/DisciplinaComInteresse';
  import SelecaoDeCondicaoEspecial from '@/components/interesse/SelecaoDeCondicaoEspecial.vue';
  import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
  import {
    AutorizacaoActionTypes,
  } from 'componente-frontend-core/store/autorizacao/actions';

  const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
  const interesseNamespace = namespace(StoreNamespaces.INTERESSE);

  @Component({
    components: {
      SelecaoDeCondicaoEspecial,
    },
  })
  export default class SelecaoDeDisciplinas extends Vue {
    public disciplinasSelecionadas: DisciplinaComInteresse[] = [];

    @autorizacaoNamespace.State
    public usuarioLogado!: UsuarioIdentity;

    @interesseNamespace.Action(InteresseActionTypes.OBTER_DISCIPLINAS_PENDENTES)
    public obterDisciplinasPendentes!: (codigoDoAluno: number) => Promise < any > ;

    @interesseNamespace.Action(InteresseActionTypes.MANIFESTAR_INTERESSE)
    public manifestarInteresse!: (request: ManifestarInteresseRequest) => Promise < void > ;

    @interesseNamespace.State
    public disciplinas!: DisciplinaComInteresse[];

    public mounted() {
      this.obterDisciplinasPendentes(this.usuarioLogado.codigo || 0)
        .then(this.carregarDisciplinasSelecionadas);
    }

    public carregarDisciplinasSelecionadas() {
      this.disciplinasSelecionadas = this.disciplinas
        .filter((d) => d.interesseManifestado)
        .map((d) => d);
    }

    public aoCheckarDisciplina() {
      this.$emit('alertaEmitido');
    }

    @Watch('disciplinasSelecionadas')
    public condicoesEspeciaisASolicitarWatch(disciplinas: DisciplinaComInteresse[]) {
      this.$emit('interesseSolicitado', disciplinas);
    }
  }
</script>