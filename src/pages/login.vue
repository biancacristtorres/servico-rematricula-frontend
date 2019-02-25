<template>
  <v-container fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex lg4 md6 sm8 xs12>
        <v-card class="pa-5" raised>
          <v-form>
            <v-alert
              :value="possuiErroCredenciais"
              transition="scale-transition" 
              color="error"
              class="my-4"
              icon="warning"
              outline>
              O R.A. ou senha preenchidos não foram encontrados no sistema. Favor corrigir e tentar novamente.
            </v-alert>

            <v-text-field 
              @keyup.enter="entrar" 
              :error="erros.usuario" 
              data-vv-name="usuario" 
              v-validate="'required'"
              v-model="login"
              name="usuario" 
              label="R.A."
              autocomplete="username" 
              id="login-usuario">
            </v-text-field>

            <v-text-field 
              @keyup.enter="entrar" 
              :error="erros.senha" 
              data-vv-name="senha"
              v-validate="'required'"
              v-model="senha"
              name="senha"
              label="Senha"
              type="password"
              autocomplete="current-password"
              id="login-senha">
            </v-text-field>

            <v-card-actions class="mt-4 justify-center pa-0">
              <v-btn :loading="loading" class="primary" block large @click="entrar" id="login-botao">
                Entrar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store';
import { AutorizacaoActionTypes } from 'componente-frontend-core/store/autorizacao/actions';

const autorizacaoNamespace = namespace(StoreNamespaces.AUTORIZACAO);

@Component({})
  export default class Login extends Vue {
    public login: string = '';
    public senha: string = '';
    public possuiErroCredenciais = false;
    public loading = false;
    public erros: any = { usuario: false, senha: false };

    @autorizacaoNamespace.Action(AutorizacaoActionTypes.FAZER_LOGIN)
    public fazerLogin!: (dados: any) => Promise<string>;

    private entrar(): void {
      this.resetarEstadosDeErro();

      this.$validator
        .validateAll()
        .then(this.aoValidarFormulario);
    }

    private resetarEstadosDeErro(): void {
      this.possuiErroCredenciais = false;
      this.erros = { usuario: false, senha: false };
    }

    private aoValidarFormulario(estaValido: any): void {
      if (estaValido) {
        this.quandoOFormularioEstaValido();
      } else {
        this.quandoOFormularioEstaInvalido();
      }
    }

    private quandoOFormularioEstaValido(): void {
      this.ligarLoading();
      this.fazerLogin({ usuario: this.login, senha: this.senha })
        .then(this.loginComSucesso)
        .catch(this.falhaNoLogin)
        .finally(this.desligarLoading);
    }

    private quandoOFormularioEstaInvalido(): void {
        this.erros = { usuario: this.errors.has('usuario'), senha: this.errors.has('senha') };
    }

    private loginComSucesso(): void {
      this.$router.push('/');
    }

    private falhaNoLogin(): void {
      this.possuiErroCredenciais = true;
    }

    private ligarLoading() {
      this.loading = true;
    }

    private desligarLoading() {
      this.loading = false;
    }
}
</script>

