import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import navigation from "@/components/navigation";
import MenuItem from "ant-design-vue/lib/menu/MenuItem"

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);
const router = new VueRouter();

describe('navigation', function () {

    it('check tabs for not-login users', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: -1 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(4);
    });

    it('check tabs for ordinary users', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 0 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(6);
    });

    it('check tabs for publishers', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 1 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(8);
    });

    it('check tabs for attendants', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 2 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(9);
    });

    it('check routers', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 2 },
            stubs: { RouterLink: RouterLinkStub }
        });
        const routerLinks = wrapper.findAllComponents(RouterLinkStub);
        expect(routerLinks.at(0).props('to')).toBe('/ground');
        expect(routerLinks.at(1).props('to')).toBe('/rules');
        expect(routerLinks.at(2).props('to')).toBe('/mission/create');
        expect(routerLinks.at(3).props('to')).toBe('/orders');
        expect(routerLinks.at(4).props('to')).toBe('/pub');
        expect(routerLinks.at(5).props('to')).toBe('/user');
        expect(routerLinks.at(6).props('to')).toBe('/users');
    });

    it('route -> current', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 2 },
            stubs: { RouterLink: RouterLinkStub }
            // mocks: { $route }
        });
        expect(wrapper.vm.current[0]).toBe(wrapper.vm.$route.path);
    });
});
