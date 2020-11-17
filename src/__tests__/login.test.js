import { mount, createLocalVue } from "@vue/test-utils";
import login from "@/components/login"
import VueRouter from "vue-router";

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
})
