import { shallowMount } from '@vue/test-utils';
import SearchResults from '@/components/SearchResults.vue';
jest.mock('axios');

describe('SearchResutls.vue', () => {
  it('fetches async after being mounted', done => {
    const wrapper = shallowMount(SearchResults);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.stores).toHaveLength(8);
      done();
    });
  });
});
