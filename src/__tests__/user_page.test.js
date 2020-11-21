import user_page from "@/components/user_page";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
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

describe('user_page', () => {

    it('check data', () => {
        const wrapper = mount(user_page, { localVue, router });
        expect(wrapper.vm.editing).toBe(false);
    })

    it('check onApplyUpgrade', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(user_page, { localVue, router });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.onApplyUpgrade();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check onApplyUpgrade, fail', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(user_page, { localVue, router });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.onApplyUpgrade();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test beforeUploadAvatar, test case', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'image/jpeg',
            size: 1024
        })
    })

    it('test beforeUploadAvatar, fail case 1', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'image/jpeg',
            size: 102400000
        })
    })

    it('test beforeUploadAvatar, fail case 2', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'text/json',
            size: 1024
        })
    })

    it('test onChangeAvatar', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.onChangeAvatar("/image/test");
        expect(wrapper.emitted('change-avatar')).toBeTruthy();
    })

    it('test uploadAvatar', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(user_page, { localVue, router });
        wrapper.setData({ upload_avatar: { name: 'test.png' } });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.uploadAvatar();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test uploadAvatar, fail', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(user_page, { localVue, router });
        wrapper.setData({ upload_avatar: { name: 'test.png' } });
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.uploadAvatar();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})
