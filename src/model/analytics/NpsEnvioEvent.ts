import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export enum NpsEnvioCategory {
  CLIQUE = 'NPS-Cliques',
  NOTA = 'NPS-Envio-Nota',
  COMENTARIO = 'NPS-Envio-Coment',
}

export default class NpsEnvioEvent extends AnalyticsGaEvent {
  constructor(pCategory: NpsEnvioCategory, valor: number, comment?: string) {
    super(pCategory, valor.toString());
    this.value = valor;
    if (pCategory === NpsEnvioCategory.COMENTARIO) {
      this.label = comment;
    }
  }
}
