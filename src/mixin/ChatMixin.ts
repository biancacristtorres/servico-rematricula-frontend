import Vue from 'vue';
import { Mixin } from 'vue-mixin-decorator';
import store, { StoreNamespaces } from '@/store';
import { namespace } from 'vuex-class';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import { FreshChat } from '@/common/utils/FreshChat';
import { ToggleConstants } from '@/common/enum/ToggleConstants';
import { MarcaGetterTypes } from '@/store/marca/getters';

const alunoNamespace: any = namespace(StoreNamespaces.ALUNO);
const autorizacaoNamespace: any = namespace(StoreNamespaces.AUTORIZACAO);
const featureToggle = namespace(StoreNamespaces.FEATURE_TOGGLE);

@Mixin
export class ChatMixin extends Vue {

  @alunoNamespace.State
  public informacoesAluno?: InformacoesAluno;

  @autorizacaoNamespace.State
  public usuarioDecodificado?: any;

  @featureToggle.State
  public features!: any[];

  public get informacoesUsuario() {
    if (this.informacoesAluno && this.usuarioDecodificado) {
      return {
        firstName: this.usuarioDecodificado!.given_name,
        lastName: this.usuarioDecodificado!.family_name,
        email: this.informacoesAluno!.email,
        phone: this.informacoesAluno!.telefone,
        numeroMatricula: this.informacoesAluno!.numeroMatricula,
        instituicao: this.informacoesAluno!.instituicao,
        campus: this.informacoesAluno!.campus,
        curso: this.informacoesAluno!.curso,
      };
    }

    return null;
  }

  public created() {
    const fcWidget = (window as any).fcWidget;
    if (fcWidget) {
      this.iniciarFreshChat();
    }
  }

  public async iniciarFreshChat() {
    const toggleHabilitado = await this.toggleHabilitarFreshChat();
    if (toggleHabilitado) {

      const usuarioEstaLogado = this.informacoesAluno && this.usuarioDecodificado;
      FreshChat.iniciar(usuarioEstaLogado, this.informacoesUsuario);
    }
  }

  public async toggleHabilitarFreshChat(): Promise<boolean> {
    if (!this.informacoesAluno) {
      return false;
    }

    const toggleAtivado = await
      this.$features.habilitado(ToggleConstants.HabilitarFreshChat);

    const eUniBH = store.getters[
      `${StoreNamespaces.MARCA}/${MarcaGetterTypes.E_UNI_BH}`
    ](this.informacoesAluno.codigoInstituicao);

    return eUniBH ? toggleAtivado : true;
  }

}
