import ground from "@/components/ground";
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

const mockXmlChange = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify({
            total: 5,
            question_list: [
                { questionForm: 'chosen', type: '', deadline: 1 },
                { questionForm: 'fill', type: '', deadline: 1 },
                { questionForm: 'chosen-image', type: '', deadline: 1 },
                { questionForm: 'fill-image', type: '', deadline: 1 },
                { questionForm: 'fill-image', type: '', deadline: 1 }
            ]}
        )}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlChangeFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: ""}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlChangeCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: "123456",
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlOrder = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: ''}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
}


describe('ground', () => {

    it('check function', () => {
        const wrapper = shallowMount(ground, {localVue, router})
        expect(wrapper.vm.min(1, 2)).toBe(1)
        expect(wrapper.vm.min(2, 1)).toBe(1)
    })

    it('check onChange Judgement', () => {
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({type: ['文字-选择', '文字-填空', '图片-选择', '图片-填空']});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChange);
        wrapper.vm.onChange(1);
        mockXmlChange.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check onChange Fail', () => {
        const wrapper = shallowMount(ground, {localVue, router})
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeFail);
        wrapper.vm.onChange(1);
        mockXmlChangeFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check deleteMsg', () => {
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({msgList: [
                {id: 0, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
                {id: 1, questionNum: 0},
            ]});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        wrapper.vm.deleteMsg(0);
        mockXmlChangeCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check getOrder1', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1 });
        wrapper.vm.getOrder({id: 1, received: 'T'}, true);
        window.XMLHttpRequest = jest.fn(() => mockXmlOrder);
        mockXmlChangeCsrf.onreadystatechange();
        mockXmlOrder.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check getOrder2', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1 });
        wrapper.vm.getOrder({id: 1, received: 'F'}, true);
        window.XMLHttpRequest = jest.fn(() => mockXmlOrder);
        mockXmlChangeCsrf.onreadystatechange();
        mockXmlOrder.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check getOrder3', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1, intNum: 5 });
        wrapper.vm.getOrder({id: 1, received: 'T'}, false);
        window.XMLHttpRequest = jest.fn(() => mockXmlOrder);
        mockXmlChangeCsrf.onreadystatechange();
        window.XMLHttpRequest = jest.fn(() => mockXmlChange);
        mockXmlOrder.onreadystatechange();
        mockXmlChange.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check getOrder4', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1 });
        wrapper.vm.getOrder({id: 1, received: 'F'}, false);
        window.XMLHttpRequest = jest.fn(() => mockXmlOrder);
        mockXmlChangeCsrf.onreadystatechange();
        mockXmlOrder.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check getOrder5', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeCsrf);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1 });
        wrapper.vm.getOrder({id: 1, received: 'F'}, true);
        window.XMLHttpRequest = jest.fn(() => mockXmlChangeFail);
        mockXmlChangeCsrf.onreadystatechange();
        mockXmlChangeFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check onSearch', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChange);
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({ pageNumber: 1 });
        wrapper.vm.onSearch();
        mockXmlChange.onreadystatechange();
        wrapper.vm.sendSelect();
        mockXmlChange.onreadystatechange();
        wrapper.vm.$mount();
        mockXmlChange.onreadystatechange();
        window.XMLHttpRequest = oldXml;
        expect(wrapper.vm.keyword).toBe('');
    })

    it('check other functions', () => {
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.vm.handleChangeTheme('value1');
        expect(wrapper.vm.theme).toBe('value1');
        wrapper.vm.handleChangeType('value2');
        expect(wrapper.vm.type).toBe('value2');
        wrapper.vm.changeType();
        expect(wrapper.vm.groundType).toBe(2);
        wrapper.vm.changeType();
        expect(wrapper.vm.groundType).toBe(1);
    })

    it('test getNewInterest', () => {
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.setData({type: ['选择', '判断', '文字', '图片']});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlChange);
        wrapper.vm.getNewInterest(1);
        mockXmlChange.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test goOrder', () => {
        const wrapper = shallowMount(ground, {localVue, router});
        wrapper.vm.goOrder({received: 'F', id: 1});
    })
})
