import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import login from "@/components/login"
import VueRouter from "vue-router";
import userManage from "@/components/manager/userManage";

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const mockXmlLogin = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({ code: 201, data: "123456" }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlLoginFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({ code: 400, data: "fail" }),
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

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: "123456",
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('login', () => {

    it('Login Send Msg', () => {
        const wrapper = mount(login, { localVue, router });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlLogin);
        wrapper.vm.sendMsg();
        mockXmlLogin.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('Login Send Msg Fail', () => {
        const wrapper = mount(login, { localVue, router });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlLoginFail);
        wrapper.vm.sendMsg();
        mockXmlLoginFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test sendMsg', function () {
        const wrapper = shallowMount(login, { localVue, router });
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
        const wrapper = shallowMount(login, { localVue, router });
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
