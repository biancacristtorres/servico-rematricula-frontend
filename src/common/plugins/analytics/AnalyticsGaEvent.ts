export default class AnalyticsGaEvent {
  public event = 'ga-event';
  public category: string;
  public action: string;
  public label: any = '';
  public value: any = '';

  constructor(pCategory: string, pAction: string) {
    this.category = pCategory;
    this.action = pAction;
  }
}
