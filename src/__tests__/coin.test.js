import navigation from "@/components/navigation";
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);
const router = new VueRouter();

const mockXmlSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: 'Success'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: 'Fail'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('navigation_coin', () => {
    it('test showModal', () => {
        const wrapper = mount(navigation, {localVue, router});
        wrapper.vm.showModal();
        expect(wrapper.vm.visible).toBe(true);
    })

    it('test handleCancel', () => {
        const wrapper = mount(navigation, {localVue, router});
        wrapper.vm.handleCancel();
        expect(wrapper.vm.visible).toBe(false);
    })

    it('test handelOk', () => {
        const wrapper = mount(navigation, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSuccess);
        wrapper.vm.handleOk();
        mockXmlSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
        expect(wrapper.vm.visible).toBe(false);
        expect(wrapper.vm.confirmLoading).toBe(false);
    })

    it('test handelOk Fail', () => {
        const wrapper = mount(navigation, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlFail);
        wrapper.vm.handleOk();
        mockXmlFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
        expect(wrapper.vm.visible).toBe(false);
        expect(wrapper.vm.confirmLoading).toBe(false);
    })
})
