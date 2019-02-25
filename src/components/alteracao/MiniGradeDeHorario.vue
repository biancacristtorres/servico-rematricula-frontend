<template>
  <div>
    <div class="container-tabela">
      <v-container class="container-grade box pa-0 caption">
        <v-layout row> 
          <v-flex class="display-table celula" v-for="(cabecalho, i) in cabecalhos" :key="i + '-cabecalho'" xs2>
            <div class="display-cell">
              {{cabecalho}}
            </div>
          </v-flex>
        </v-layout>

        <v-layout v-if="estaCarregando" id="loading-mini-grade" class="justify-center pa-3">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </v-layout>

        <v-layout v-else v-for="(horario, i) in horarios" :key="i" row align-space-around justify-center fill-height class="align-content-center">
          <v-flex class="celula" text-xs-center xs2>
              <v-layout align-center justify-center row fill-height>
                <div>
                  {{ horario.horaInicio }}
                </div>
              </v-layout>
          </v-flex>

          <v-flex class="celula" v-for="(disciplinasPorDiaDeSemana, i) in horario.disciplinasPorDiaDeSemana" :key="i + '-disciplina'" xs2>
            <v-layout class="pa-0" row wrap align-center justify-center fill-height>
              <template v-if="disciplinasPorDiaDeSemana">
                <v-flex xs12
                      align-center
                      class="text-xs-center pa-1" 
                      v-for="(disciplina, i) in disciplinasPorDiaDeSemana" 
                      :key="i + '-disciplina-por-semana'">
                  <div :style="circuloDaCorDaDisciplina(disciplina.nomeDisciplina)">
                  </div>
                </v-flex>
              </template>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.box
  border-radius: 2px
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25)
  background-color: white

.celula
  border-left: 1px solid #e0e0e0
  border-bottom : 1px solid #e0e0e0
  min-height: 40px

.display-table
  display: table
  width: 100%

.display-cell
  display: table-cell
  text-align: center
  vertical-align: middle
</style>

<script lang='ts'>
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { Horario } from '@/model/Horario';
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { StatusDaDisciplina } from '@/common/enum/StatusDaDisciplina';
import { DisciplinaResumo } from '@/model/DisciplinaResumo';
import { DisciplinasPorDiaDeSemana } from '@/model/DisciplinasPorDiaDeSemana';
import { GeradorDeCores } from '@/common/utils/GeradorDeCores';
import { FeatureToggleActionTypes } from 'componente-frontend-core/store/featureToggle/actions';
import { AlteracaoGetterTypes } from '@/store/alteracao/getters';

const autorizacao = namespace(StoreNamespaces.AUTORIZACAO);
const miniGrade = namespace(StoreNamespaces.MINI_GRADE);
const alteracao = namespace(StoreNamespaces.ALTERACAO);

@Component({})
export default class GradeDeHorario extends Vue {

  @autorizacao.State
  public usuarioLogado!: UsuarioIdentity;

  @miniGrade.State
  public horarios!: Horario[];

  @alteracao.Getter(AlteracaoGetterTypes.ESTA_CARREGANDO)
  private estaCarregando!: boolean;

  private cabecalhos: string[] = [
    '',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
  ];

  public circuloDaCorDaDisciplina(nomeDaDisciplina: string) {
    const corDaDisciplina = GeradorDeCores.GerarUmaCorBaseadaNumaString(nomeDaDisciplina);
    return {
      'width': '10px',
      'height': '10px',
      'background': corDaDisciplina,
      'border-radius': '50%',
      'margin': '0 auto',
    };
  }
}
</script>