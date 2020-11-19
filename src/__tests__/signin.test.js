import {mount, createLocalVue, shallowMount} from "@vue/test-utils";
import signin from "@/components/signin"
import VueRouter from "vue-router";
import login from "@/components/login";

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: '123456',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlPost = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({
        code: 201,
        data: JSON.stringify({ name: 'test', power: 0, avatar: "" })
    }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
}

const mockXmlPostFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({ code: 400, data: 'test' }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
}

describe('signin', () => {
    it('Signin Send Msg', () => {
        const wrapper = mount(signin, {
            localVue,
            router
        });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendMsg();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('Signin watch name', () => {
        const wrapper = mount(signin, {
            localVue,
            router
        });
        wrapper.setData({
            name: "0abc"
        })
        expect(wrapper.vm.nameOK).toBe(false)
    })

    it('Signin watch password ok', () => {
        const wrapper = mount(signin, {
            localVue,
            router
        });
        wrapper.setData({
            secret: "abc",
            repeat: "abc"
        })
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.secretOK).toBe(true)
        })
    })

    it('Signin watch password not ok', () => {
        const wrapper = mount(signin, {
            localVue,
            router
        });
        wrapper.setData({
            secret: "abc",
            repeat: "abd"
        })
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.secretOK).toBe(false)
        })
    })

    it('test sendMsg', function () {
        const wrapper = shallowMount(signin, { localVue, router });
        wrapper.setData({ name: "test", secret: "123456" })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendMsg();
        window.XMLHttpRequest = jest.fn(() => mockXmlPost);
        mockXmlCsrf.onreadystatechange();
        mockXmlPost.onreadystatechange();
        window.XMLHttpRequest = oldXml;
        expect(wrapper.emitted('login')).toBeTruthy();
    })

    it('test sendMsg, fail case', function () {
        const wrapper = shallowMount(signin, { localVue, router });
        wrapper.setData({ name: "test", secret: "123456" })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendMsg();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
        expect(wrapper.emitted('login')).toBeFalsy();
    })
})
