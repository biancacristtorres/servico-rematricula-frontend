import AnalyticsGaEvent from '@/common/plugins/analytics/AnalyticsGaEvent';

export default class TooltipEvent extends AnalyticsGaEvent {
  constructor(pName: string) {
    super('tooltips', pName);
  }
}
