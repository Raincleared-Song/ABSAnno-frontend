import { mount, createLocalVue } from "@vue/test-utils";
import signin from "@/components/signin"
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
})
