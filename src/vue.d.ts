import Vue from 'vue';
import { AxiosInstance } from 'axios';
import DialogoInstance from '@/common/plugins/dialogo/DialogoInstance';
import { ErrorBag } from 'vee-validate';
import AnalyticsInstance from '@/common/plugins/analytics/AnalyticsInstance';

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance;
    errors: ErrorBag;
    $dialogo: DialogoInstance;
    $features: any;
    $gtm: any;
    $analytics: AnalyticsInstance;
  }
}
