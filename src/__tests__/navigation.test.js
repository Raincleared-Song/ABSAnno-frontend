import {mount, createLocalVue, RouterLinkStub, shallowMount} from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import navigation from "@/components/navigation";
import MenuItem from "ant-design-vue/lib/menu/MenuItem"
import router from "@/router/router";

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: '123456',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlPostSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: 'Success'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlPostFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: 'Fail'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

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
        expect(menuItems).toHaveLength(5);
    });

    it('check tabs for publishers', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 1 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(7);
    });

    it('check tabs for attendants', function () {
        const wrapper = mount(navigation, {
            localVue,
            router,
            propsData: { username: 'test', power: 2 }
        });
        const menuItems = wrapper.findAllComponents(MenuItem);
        expect(menuItems).toHaveLength(8);
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
        expect(routerLinks.at(2).props('to')).toBe('/orders');
        expect(routerLinks.at(3).props('to')).toBe('/mission/create');
        expect(routerLinks.at(4).props('to')).toBe('/pub');
        expect(routerLinks.at(5).props('to')).toBe('/users');
        expect(routerLinks.at(6).props('to')).toBe('/ground');
        expect(routerLinks.at(7).props('to')).toBe('/user');
    });

    it('check onClick', () => {
        const wrapper = mount(navigation, {localVue, router});
        wrapper.vm.onClick();
    })

    it('check watch', () => {
        const wrapper = mount(navigation, {localVue, router});
        wrapper.vm.$router.push('/login');
        expect(router).toBeDefined();
    })

    it('check watch fail', () => {
        const wrapper = mount(navigation, {localVue, router});
        wrapper.vm.$router.push('/haha');
    })

    it('check post login', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = shallowMount(navigation, { localVue, router });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.onClick();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        expect(wrapper.emitted('logout')).toBeTruthy();
        window.XMLHttpRequest = oldXml;
    })

    it('check post login fail', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = shallowMount(navigation, { localVue, router });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.onClick();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        expect(wrapper.emitted('logout')).toBeFalsy();
        window.XMLHttpRequest = oldXml;
    })
});
