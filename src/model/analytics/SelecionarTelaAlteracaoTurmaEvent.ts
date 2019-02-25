import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export default class SelecionarTelaAlteracaoTurmaEvent extends AnalyticsGaEvent {
  constructor(pTurma: any, pVagas: any) {
    super('materias-alteracao', pTurma);
    this.label = pVagas;
  }
}
