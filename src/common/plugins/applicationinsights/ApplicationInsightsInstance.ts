// tslint:disable
const VueGtm = require("vue-gtm").default;

export default class ApplicationInsightsInstance {
  constructor() {
    this.initializeScritpHead();
  }

  private initializeScritpHead() {
    const instrumentationKey =
      process.env.VUE_APP_APPLICATIONINSIGHTS_INSTRUMENTATIONKEY;

    const scriptHead = `
      var appInsights=window.appInsights||function(a){
      function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c
      }({
          instrumentationKey:"${instrumentationKey}",
          disableCorrelationHeaders : false
      });

      window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView();`;

    const head = document.getElementsByTagName("head")[0];

    const scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.text = scriptHead;
    head.appendChild(scriptTag);
  }
}