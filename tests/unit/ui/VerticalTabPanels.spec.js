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
      tabIndex: 2,
      barHeight: 50,
      barOffsetTop: 10,
      goToDuration: 500,
      goToOffset: 30
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

  it('"$vuetify.goTo()" will be called when "scrollToPanel" event dispatched.', async () => {
    // failed to use the "mocks" mounting option with a localVue.
    wrapper.vm.$vuetify = {
      goTo: jest.fn()
    };
    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$bus.$emit('scrollToPanel', 1);

    const arg1 = ".tab-panel:nth-child(2)";
    const arg2 = {
      "duration": 500,
      "offset": 30
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
