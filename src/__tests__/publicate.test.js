import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import publicate from "@/components/publicate"

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
        data: JSON.stringify({
            mission_list: [
                {deadline: new Date().getTime(), question_form: 'chosen', to_ans: 1},
                {deadline: new Date().getTime(), question_form: 'fill', to_ans: 1},
                {deadline: new Date().getTime(), question_form: 'chosen-image', to_ans: 1},
                {deadline: new Date().getTime(), question_form: 'fill-image', to_ans: 1},
            ]
        })
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
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: { username: 'test', power: 0, avatar: 'test' }
        })
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.checkMsg(123);
        window.XMLHttpRequest = jest.fn(() => mockXmlSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test checkMsg, fail', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: { username: 'test', power: 0, avatar: 'test' }
        })
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.checkMsg(123);
        window.XMLHttpRequest = jest.fn(() => mockXmlFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check stopMsg', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = shallowMount(publicate, { localVue, router });
        wrapper.setData({ pubList: [{ id: 1, showLegend: 0 }, { id: 2, showLegend: 0 }] })
        window.XMLHttpRequest = jest.fn(() => mockXmlCheck);
        wrapper.vm.stopMsg(1);
        mockXmlCheck.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check stopMsg, fail', function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = shallowMount(publicate, { localVue, router });
        window.XMLHttpRequest = jest.fn(() => mockXmlFail);
        wrapper.vm.stopMsg(1);
        mockXmlFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test judgeDisable', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: { username: 'test', power: 0, avatar: 'test' }
        })
        wrapper.vm.judgeDisable("fake message");
    })

    it('test mount', function () {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlUser);
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        mockXmlUser.onreadystatechange();
        expect(wrapper.vm.pubList).toHaveLength(4);
        window.XMLHttpRequest = oldXml;
    })

    it('check watch activeKey', async function () {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(publicate, {
            localVue, router,
            propsData: {
                username: 'test', power: 0, avatar: 'test'
            }
        });
        await wrapper.setData({ activeKey: [], detailedInfo: [] });
        window.XMLHttpRequest = jest.fn(() => mockXmlCheck);
        await wrapper.setData({ activeKey: [{id: 1}] });
        mockXmlCheck.onreadystatechange();
        expect(wrapper.vm.detailedInfo).toHaveLength(0);
        window.XMLHttpRequest = oldXml;
    })
})