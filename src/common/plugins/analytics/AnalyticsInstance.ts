import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { InformacoesAluno } from '@/model/InformacoesAluno';
import PageViewEvent from '@/model/analytics/PageViewEvent';

// tslint:disable-next-line
const VueGtm = require('vue-gtm').default;

export default class AnalyticsInstance {
  private gtmId!: string;
  private router!: Router;

  constructor(router: Router) {
    this.router = router;
    this.configureTagManager();
    this.initializeScritpHead();
    this.initializeScriptBody();
    this.trackPageView();
  }

  public track(obj: any) {
    const newDataLayer = this.sanitizeDataLayer(obj);
    Vue.prototype.$gtm.trackEvent(newDataLayer);
  }

  public trackRouter() {
    this.track(new PageViewEvent(this.router.currentRoute.path));
  }

  private configureTagManager() {
    this.gtmId = String(process.env.VUE_APP_TAGMANAGER_ID);
    Vue.use(VueGtm, {
      id: this.gtmId,
      enabled: true,
      debug: true,
      vueRouter: this.router,
    });
  }

  private trackPageView() {
    /**
     * Para cada mudança de rota para página logada envia os dados do aluno
     */
    this.router.afterEach((to, from) => {
      if (to.path === from.path) {
        return;
      }

      if (this.getUserInfo()) {
        const usuarioLogado = this.getLoggedUser();
        const info = this.getUserInfo() || {};
        const dadosUsuario = {
          'event': 'setIds',
          'id-aluno': usuarioLogado.login,
          'instituicao': info.instituicao,
          'campus': info.campus,
          'curso': info.curso,
          'regularidade': info.regularidade,
          'periodo-letivo': info.periodoLetivo,
          'tipo-acesso': 'aluno',
        };

        this.track(dadosUsuario);
      }
    });
  }

  private getLoggedUser() {
    const usuarioLogado = (store.state as any).autorizacao.usuarioLogado;
    return usuarioLogado;
  }

  private getUserInfo() {
    return (store.state as any).aluno.informacoesAluno as InformacoesAluno;
  }

  private initializeScritpHead() {
    const scriptHead = [
      ';(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":',
      'new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],',
      'j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=',
      '"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);',
      '})(window,document,"script","dataLayer", "#GTM_KEY#");',
    ].join('');

    const head = document.getElementsByTagName('head')[0];

    const scriptHeadTag = scriptHead.replace(/#GTM_KEY#/g, (this.gtmId));
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = scriptHeadTag;
    head.appendChild(scriptTag);
  }

  private initializeScriptBody() {
    const scriptBody = [
      '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=#GTM_KEY#"',
      ' height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
    ].join('');

    const noScriptTag = scriptBody.replace(/#GTM_KEY#/g, (this.gtmId));
    document.body.insertAdjacentHTML('afterbegin', noScriptTag);
  }

  private sanitizeDataLayer(obj: any) {
    const newDataLayer: { [k: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = typeof obj[key] === 'string' ? this.tratarDadosAnalytics(obj[key]) : obj[key];
        newDataLayer[key] = value;
      }
    });

    return newDataLayer;
  }

  private tratarDadosAnalytics(str: any) {
    let result = '';
    if (typeof str !== 'string') {
      return str;
    }
    result = str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s+/g, '_')
      .replace(/[áàâãåäæª]/g, 'a')
      .replace(/[éèêëЄ€]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõöøº]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç¢©]/g, 'c');

    return result;
  }
}
