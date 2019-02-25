import { InformacoesAluno } from '@/model/InformacoesAluno';

export class FreshChat {

  public static iniciar(usuarioLogado: boolean, informacoesUsuario: any) {
    const fcWidget = (window as any).fcWidget;
    if (fcWidget) {
      if (!fcWidget.isInitialized()) {
        this.inicializarChat(fcWidget, informacoesUsuario);
      }
      fcWidget.user.get((resp: any) => {
        this.enviarInformacoesDoAluno(fcWidget, usuarioLogado, informacoesUsuario, resp);
      });
    }
  }

  public static enviarInformacoesDoAluno(fcWidget: any, usuarioLogado: boolean, informacoesUsuario: any, resp: any) {
    const responseInvalida = resp == null || resp.status !== 200;
    const possuiUsuario = !responseInvalida && resp.data.identifier !== undefined;

    if (usuarioLogado && (responseInvalida || !possuiUsuario)) {
      fcWidget.user.setProperties(informacoesUsuario);
    } else if (possuiUsuario && !usuarioLogado) {
      fcWidget.user.clear();
    }
  }

  public static limparUsuario() {
    const fcWidget = (window as any).fcWidget;
    if (fcWidget) {
      fcWidget.user.clear();
    }
  }

  private static inicializarChat(fcWidget: any, informacoesAluno: InformacoesAluno) {
    fcWidget.init({
      token: String(process.env.VUE_APP_FRESHCHAT_TOKEN),
      host: 'https://wchat.freshchat.com',
      externalId: informacoesAluno && informacoesAluno.codigoAluno || null,
    });
  }
}
