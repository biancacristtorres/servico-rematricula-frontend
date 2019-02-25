<template>
  <v-toolbar-items  id="pessoa-logada-container" v-if="existeUsuarioLogado">
    <input type="hidden" id="registro-academico" :value="registroAcademico">

    <v-menu offset-y>
      <v-btn v-if="$vuetify.breakpoint.smAndDown"  slot="activator" icon flat>
        <v-icon >
          account_circle
        </v-icon>
      </v-btn>

      <v-btn v-else slot="activator" flat>
          <span id="nome-pessoa">
            {{ nomeSocial }}
          </span>
          <v-icon right dark>
            arrow_drop_down
          </v-icon>
      </v-btn>

      <v-list light>
        <v-list-tile  @click="logoff">
          <v-list-tile-title id="logoff">
            Sair
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar-items>
</template>

<script lang='ts'>
import UsuarioIdentity from 'componente-frontend-core/model/UsuarioIdentity';
import { Instituicao } from '@/common/enum/Instituicao';
import { Marca } from '@/model/Marca';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { StoreNamespaces } from '@/store';
import { GlobalActionTypes } from '@/store/actions';
import { namespace, Action } from 'vuex-class';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';
import { MarcaGetterTypes } from '@/store/marca/getters';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { FreshChat } from '@/common/utils/FreshChat';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);
const marca = namespace(StoreNamespaces.MARCA);
const aluno = namespace(StoreNamespaces.ALUNO);


@Component({})
export default class PessoaLogada extends Vue {

  @autorizacaoNamespace.State
  public usuarioLogado!: UsuarioIdentity;

  @aluno.State
  public informacoesAluno!: InformacoesAluno;

  public linkDoSol!: string;

  @autorizacaoNamespace.Action(AutorizacaoActionTypes.FAZER_LOGOUT)
  public fazerLogout!: () => Promise<void>;

  @Action(GlobalActionTypes.LIMPAR_STORE)
  public limparStore!: () => Promise<void>;

  @marca.Getter(MarcaGetterTypes.OBTER_LINK_DO_SOL)
  public obterLinkDoSol!: (instituicao: Instituicao) => string;

  public get existeUsuarioLogado() {
    return this.usuarioLogado !== null;
  }

  public get nomeSocial(): string {
    return this.informacoesAluno ? this.informacoesAluno.nomeSocial! : '';
  }

  public get registroAcademico(): string {
    return this.informacoesAluno ? this.informacoesAluno.numeroMatricula! : '';
  }

  public logoff() {
    this.linkDoSol = this.obterLinkDoSol(
      this.informacoesAluno.codigoInstituicao,
    );

    this.fazerLogout().then(this.aoFazerLogoff);
  }

  public async aoFazerLogoff() {
    await this.limparStore();
    FreshChat.limparUsuario();
    window.location.assign(this.linkDoSol);
  }
}
</script>