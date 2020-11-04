import upload_mission from "@/components/upload_mission";
import VueRouter from "vue-router";
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
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

const mockXmlCsrfInvalid = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 404,
    responseText: '123456',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('test upload mission', () => {
    it('upload data', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        expect(wrapper.vm.fileList).toStrictEqual([])
        expect(wrapper.vm.headers).toStrictEqual({"X-CSRFToken": ""})
    })
    it('upload csrf', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.onBeforeUpload();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('upload csrf invalid', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrfInvalid);
        wrapper.vm.onBeforeUpload();
        mockXmlCsrfInvalid.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('upload onSuccess', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        wrapper.vm.onSuccess();
        expect(wrapper.vm.$router.history.current.path).toBe('/ground')
    })
    it('upload onError', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        wrapper.vm.onError();
    })
    it('upload onClickKnowRule', () => {
        const wrapper = mount(upload_mission, {
            localVue,
            router
        });
        wrapper.vm.onClickKnowRule();
    })
})
