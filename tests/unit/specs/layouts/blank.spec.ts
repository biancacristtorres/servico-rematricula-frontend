import { shallowMount } from '@vue/test-utils';
import blank from '@/layouts/blank.vue';
import store from '@/store';

describe('layout > black.vue', () => {
  it('deveRenderizar', () => {
    const wrapper = shallowMount(blank, {
      localVue,
      store,
      stubs: ['router-view'],
      mocks: {
        $route: {
          fullPath: '',
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
