import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import navigation from "@/components/navigation";

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);
const router = new VueRouter();

describe('navigation', function () {
    const $route = { path: '' };

    it('check tabs for not-login users', () => {
        const wrapper = shallowMount(navigation, {
            localVue,
            propsData: { username: 'test', power: -1 },
            mocks: { $route }
        });
        const menuItems = wrapper.findAllComponents({ name: 'a-menu-item' });
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('登陆')).toBe(true);
        expect(menuItems.at(3).text().contains('注册')).toBe(true);
    });

    it('check tabs for ordinary users', () => {
        const wrapper = shallowMount(navigation, {
            localVue,
            propsData: { username: 'test', power: 0 },
            mocks: { $route }
        });
        const menuItems = wrapper.findAllComponents({ name: 'a-menu-item' });
        expect(menuItems).toHaveLength(5);
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('我的接单')).toBe(true);
        expect(menuItems.at(3).text().contains('个人中心')).toBe(true);
        expect(menuItems.at(4).text().contains('登出')).toBe(true);
    });

    it('check tabs for publishers', () => {
        const wrapper = shallowMount(navigation, {
            localVue,
            propsData: { username: 'test', power: 1 },
            mocks: { $route }
        });
        const menuItems = wrapper.findAllComponents({ name: 'a-menu-item' });
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('发布题目')).toBe(true);
        expect(menuItems.at(3).text().contains('我的接单')).toBe(true);
        expect(menuItems.at(4).text().contains('我的发布')).toBe(true);
        expect(menuItems.at(5).text().contains('个人中心')).toBe(true);
        expect(menuItems.at(6).text().contains('登出')).toBe(true);
    });

    it('check tabs for attendents', () => {
        const wrapper = shallowMount(navigation, {
            localVue,
            propsData: { username: 'test', power: 2 },
            mocks: { $route }
        });
        const menuItems = wrapper.findAllComponents({ name: 'a-menu-item' });
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('发布题目')).toBe(true);
        expect(menuItems.at(3).text().contains('我的接单')).toBe(true);
        expect(menuItems.at(4).text().contains('我的发布')).toBe(true);
        expect(menuItems.at(5).text().contains('个人中心')).toBe(true);
        expect(menuItems.at(6).text().contains('管理用户')).toBe(true);
        expect(menuItems.at(7).text().contains('登出')).toBe(true);
    });

    it('check routers', () => {
        const wrapper = shallowMount(navigation, {
            localVue,
            propsData: { username: 'test', power: 2 },
            stubs: { RouterLink: RouterLinkStub },
            mocks: { $route }
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
});
