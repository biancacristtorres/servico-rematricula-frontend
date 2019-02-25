import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export default class EnvioComprovanteEmailEvent extends AnalyticsGaEvent {
  constructor() {
    super('solicitacao-comprovante-email', 'envio-sucesso');
  }
}
