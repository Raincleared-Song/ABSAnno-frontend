import edit_info from "@/components/userpage/edit_info";
import {createLocalVue, shallowMount, mount} from "@vue/test-utils";
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

const mockXmlCsrfFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
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

const mockXmlGetTags = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({
        code: 201,
        data: JSON.stringify({ tags: "tag1,tag2,tag3" })
    }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
}

describe('edit_info', function () {

    const wrapper = shallowMount(edit_info, { localVue, router });

    it('test submit', function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test submit, fail', function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test submit, csrf fail', function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test changePassword', function () {
        const oldXml = window.XMLHttpRequest;
        wrapper.setData({
            password_form: { prevPassword: '', newPassword: '', confirmPassword: ''}
        })
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.changePassword();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test changePassword, fail', function () {
        const oldXml = window.XMLHttpRequest;
        wrapper.setData({
            password_form: { prevPassword: '', newPassword: '', confirmPassword: ''}
        })
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.changePassword();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test mounted', async function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlGetTags);
        const localWrapper = mount(edit_info, { localVue, router });
        await mockXmlGetTags.onreadystatechange();
        expect(localWrapper.vm.user_info.mission_tags).toStrictEqual(['tag1', 'tag2', 'tag3']);
        window.XMLHttpRequest = oldXml;
    })

    it('test mounted, fail', async function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        const localWrapper = mount(edit_info, { localVue, router });
        await mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})