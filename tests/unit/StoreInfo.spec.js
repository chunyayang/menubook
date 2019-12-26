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
    expect(wrapper.classes('store-info')).toBe(true);
  });

  it('renders store information.', () => {
    const storeData = wrapper.vm.store;

    expect(wrapper.findAll('v-img-stub')).toHaveLength(1);
    expect(wrapper.find('v-card-title-stub').text()).toBe(storeData.name);
    expect(wrapper.findAll('.store-tag')).toHaveLength(storeData.tags.length);
    expect(wrapper.findAll('v-card-text-stub > div')).toHaveLength(5);
  });
});
