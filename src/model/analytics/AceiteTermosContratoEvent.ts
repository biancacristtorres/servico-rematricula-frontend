import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export default class AceiteTermosContratoEvent extends AnalyticsGaEvent {
  constructor(pAction: string) {
    super('aceite-termos-contrato', pAction);
  }
}
