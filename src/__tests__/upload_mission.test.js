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

const mockXmlSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({ code: 201, data: 'success' }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({ code: 400, data: 'fail' }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('test upload mission', () => {

    it('upload data', () => {
        const wrapper = mount(upload_mission, { localVue, router });
        expect(wrapper.vm.fileList).toStrictEqual([])
    })

    it('upload onClickKnowRule', () => {
        const wrapper = mount(upload_mission, { localVue, router });
        wrapper.vm.onClickKnowRule();
    })

    it('test onChangeFile', () => {
        const wrapper = mount(upload_mission, { localVue, router });
        wrapper.vm.onChangeFile({ name: 'test.zip' })
        expect(wrapper.vm.file).toStrictEqual({ name: 'test.zip' })
    })

    it('test sendFile', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(upload_mission, { localVue, router });
        wrapper.setData({ file: {name: 'test.zip'} });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendFile();
        window.XMLHttpRequest = jest.fn(() => mockXmlSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test sendFile, fail', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(upload_mission, { localVue, router });
        wrapper.setData({ file: {name: 'test.zip'} });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.sendFile();
        window.XMLHttpRequest = jest.fn(() => mockXmlFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test sendFile, undefined file', function () {
        const wrapper = mount(upload_mission, { localVue, router });
        wrapper.setData({ file: undefined });
        wrapper.vm.sendFile();
    })
})
