import { shallowMount } from '@vue/test-utils';
import StoreInfo from '@/components/StoreInfo.vue';

describe('StoreInfo.vue', () => {
  jest.mock('axios');
  const wrapper = shallowMount(StoreInfo, {
    propsData: {
      id: 1
    }
  });

  it('fetches async after being mounted.', done => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.store.id).toBe(1);
      done();
    });
  });

  it('has "store-info" class.', () => {
    expect(wrapper.find('v-card-stub').classes('store-info')).toBe(true);
  });

  it('renders store information.', () => {
    const storeData = wrapper.vm.store;

    expect(wrapper.findAll('v-img-stub')).toHaveLength(1);
    expect(wrapper.find('v-card-title-stub').text()).toBe(storeData.name);
    expect(wrapper.findAll('v-card-text-stub > div')).toHaveLength(3);
  });

  it('renders an error message when "errored" data is true.', () => {
    wrapper.vm.errored = true;
    expect(wrapper.find('v-alert-stub').exists()).toBe(true);
  });

  const wrapper2 = shallowMount(StoreInfo, {
    propsData: {
      id: 2
    }
  });

  it('ratingNum falls back to the default value when the store.rating is unexpected.', done => {
    wrapper2.vm.$nextTick(() => {
      expect(wrapper2.vm.ratingNum).toBe(0);
      done();
    });
  });
});
