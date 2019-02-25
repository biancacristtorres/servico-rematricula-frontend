import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export default class FiltroTelaAlteracaoTurmaEvent extends AnalyticsGaEvent {
  constructor(pFiltro: string, pValor: any) {
    super('filtros-alteracao', pFiltro);
    this.label = pValor;
  }
}
