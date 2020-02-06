import { shallowMount } from '@vue/test-utils';
import SearchResults from '@/components/SearchResults.vue';

describe('SearchResutls.vue', () => {
  jest.mock('axios');

  const $bus = {
    $emit: jest.fn()
  };

  const wrapper = shallowMount(SearchResults, {
    mocks: {
      $bus
    }
  });

  it('fetches async after being mounted.', done => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.stores).toHaveLength(8);
      done();
    });
  });

  it('uses grid cells to contain search results.', () => {
    expect(wrapper.classes('search-results')).toBe(true);
    expect(wrapper.findAll('v-row-stub')).toHaveLength(1);
    expect(wrapper.findAll('v-col-stub')).toHaveLength(8);
  });

  it('renders store information.', () => {
    const card = wrapper.find('v-card-stub');
    const storeData = wrapper.vm.stores[0];

    expect(card.find('v-card-title-stub').text()).toBe(storeData.name);
    expect(card.findAll('v-img-stub')).toHaveLength(1);
    expect(card.findAll('.store-tag')).toHaveLength(storeData.tags.length);
  });

  it('renders a router-link in the store info block.', () => {
    expect(wrapper.find('v-card-stub').attributes('to')).toBeTruthy();
  });

  it('emits "scrollAfterUpdate" event, so that the user scroll position can be restored.', () => {
    expect($bus.$emit).toHaveBeenCalledWith("scrollAfterUpdate");
  });

  it('renders an error message when "errored" data is true.', () => {
    wrapper.vm.errored = true;
    expect(wrapper.find('v-alert-stub').exists()).toBe(true);
  });
});
