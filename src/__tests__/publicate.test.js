import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import publicate from "@/components/publicate"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

const mockXmlSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({ code: 201, data: "success" }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({ code: 400, data: "fail" }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlCheck = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({
        code: 201,
        data: JSON.stringify({ question_list: [] })
    }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlUser = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({
        code: 201,
        data: JSON.stringify({ mission_list: [] })
    }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('publicate', function () {

    it('test data', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        expect(wrapper.vm.$data).toStrictEqual({
            activeKey: [],
            pubList:[],
            detailedInfo:[],
        })
    })

    it('test downloadMsg function', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSuccess);
        wrapper.vm.downloadMsg(123);
        mockXmlSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test downloadMsg function, fail case', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlFail);
        wrapper.vm.downloadMsg(123);
        mockXmlFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test checkMsg', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCheck);
        wrapper.vm.checkMsg(123);
        mockXmlCheck.onreadystatechange();
        expect(wrapper.vm.detailedInfo).toStrictEqual([]);
        window.XMLHttpRequest = oldXml;
    })

    it('test judgeDisable', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        wrapper.vm.judgeDisable("fake message");
    })

    it('test mount', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlUser);
        wrapper.vm.$mount();
        mockXmlUser.onreadystatechange();
        expect(wrapper.vm.pubList).toStrictEqual([]);
        window.XMLHttpRequest = oldXml;
    })

    it('test watch activeKey', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCheck);
        wrapper.vm.$watch({ activeKey: {id: 123} });
        mockXmlCheck.onreadystatechange();
        expect(wrapper.vm.detailedInfo).toStrictEqual([]);
        window.XMLHttpRequest = oldXml;
    })
})