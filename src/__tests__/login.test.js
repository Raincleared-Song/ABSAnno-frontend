import { mount, createLocalVue } from "@vue/test-utils";
import login from "@/components/login"
import VueRouter from "vue-router";

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

describe('login', () => {
    it('Login Send Msg', () => {
        const wrapper = mount(login, {
            localVue,
            router
        });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendMsg();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})
