import Vuetify from 'vuetify';
import VerticalTabPanels from '@/components/ui/VerticalTabPanels';
import { createLocalVue, mount } from '@vue/test-utils';

describe('SearchResutls.vue', () => {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  let EventBus = new localVue();

  Object.defineProperty(localVue.prototype,
    '$bus', { get: () => EventBus }
  );

  Object.defineProperty(global.document,
    'querySelectorAll', {
    value: () => [
      { offsetTop: 100 },
      { offsetTop: 600 },
      { offsetTop: 1100 },
      { offsetTop: 1600 },
      { offsetTop: 2100 }
    ]
  });

  let wrapper = mount(VerticalTabPanels, {
    localVue,
    vuetify,
    propsData: {
      tabIndex: 2
    },
    slots: {
      default: `<div><div
                  v-for="n in 5"
                  class="tab-panel"
                  style="width: 100px; height: 500px;"
                ></div></div>`
    }
  });

  it('has "vertical-tab-panels" class.', () => {
    expect(wrapper.classes('vertical-tab-panels')).toBe(true);
  });

  it('renders the given slot as 5 tab panels.', () => {
    expect(wrapper.findAll('.vertical-tab-panels .tab-panel')).toHaveLength(5);
  });

  it('"$vuetify.goTo()" will be called when "scrollToTabPanel" event dispatched.', () => {
    // failed to use the "mocks" mounting option with a localVue.
    wrapper.vm.$vuetify = {
      goTo: jest.fn()
    };
    wrapper.vm.$forceUpdate();
    wrapper.vm.$bus.$emit('scrollToTabPanel', 1);

    const arg1 = ".tab-panel:nth-child(2)";
    const arg2 = {
      "duration": wrapper.vm.vScrollDuration,
      "offset": wrapper.vm.vScrollOffset
    };
    expect(wrapper.vm.$vuetify.goTo).toHaveBeenCalledWith(arg1, arg2);
  });

  it('emits a "change" event while scrolling to a different panel.', () => {
    window.scrollY = 2200;

    // when $vuetify.goTo's scroll effect is taking place
    wrapper.vm.inTransition = true;
    wrapper.vm.onScroll();
    expect(wrapper.emitted('change')).toBeFalsy();

    wrapper.vm.inTransition = false;
    wrapper.vm.onScroll();
    expect(wrapper.emitted('change')).toEqual([[4]]);

    window.scrollY = 1600;
    wrapper.vm.onScroll();
    expect(wrapper.emitted('change')[1]).toEqual([3]);
  });
});
