import Vuetify from 'vuetify';
import MenuList from '@/components/MenuList.vue';
import { mount } from '@vue/test-utils';

describe('SearchResutls.vue', () => {
  const vuetify = new Vuetify();
  const $bus = {
    $emit: jest.fn(),
    $on: jest.fn()
  };

  jest.mock('axios');

  let wrapper = mount(MenuList, {
    vuetify,
    propsData: {
      id: 1
    },
    mocks: {
      $bus
    }
  });

  it('fetches async after being mounted.', done => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.menuList).toHaveLength(5);
      done();
    });
  });

  it('has "menu-list" class.', () => {
    expect(wrapper.classes('menu-list')).toBe(true);
  });

  it('renders the same number of tabs and tab panels according to the given data.', () => {
    const size = wrapper.vm.menuList.length;
    expect(wrapper.findAll('.v-tab')).toHaveLength(size);
    expect(wrapper.findAll('.vertical-tab-panels > .menu-list__menu')).toHaveLength(size);
  });

  it('renders dishes according to the menu data.', () => {
    const menu = wrapper.find('.menu-list__menu');
    const menuData = wrapper.vm.menuList[0];

    expect(menu.find('.v-card__title').text()).toBe(menuData.name);
    expect(menu.findAll('.v-list-item')).toHaveLength(menuData.items.length);
  });

  it('emits a "scrollToTabPanel" event after click a tab.', () => {
    wrapper.findAll('.v-tab').at(2).trigger('click');
    expect(wrapper.vm.tabIndex).toBe(2);
    expect($bus.$emit).toHaveBeenCalledWith('scrollToTabPanel', 2);
  });

  it('updates the tab bar\'s v-model when the tab panels\' v-model changes.', () => {
    const tabBar = wrapper.find('.v-tabs');
    const tabPanels = wrapper.find('.vertical-tab-panels');
    tabPanels.vm.$emit('change', 3);
    expect(tabBar.props('value')).toBe(3);
  });
});
