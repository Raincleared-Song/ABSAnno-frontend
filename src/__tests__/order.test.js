import orders from "@/components/orders";
import convertTime from "@/utils/convertTime";
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

const mockXmlMount = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({
        code: 201,
        data: JSON.stringify({
            total_num: 4,
            rep_list: [
                {deadline: new Date().getDate(), question_form: 'chosen', type: ''},
                {deadline: new Date().getDate(), question_form: 'fill', type: ''},
                {deadline: new Date().getDate(), question_form: 'chosen-imgae', type: ''},
                {deadline: new Date().getDate(), question_form: 'fill-image', type: ''},
            ]
        })
    }),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('order', () => {

    it('check data', () => {
        const wrapper = mount(orders, {localVue, router});
        expect(wrapper.vm.size).toBe(0);
        expect(wrapper.vm.msgList).toStrictEqual([]);
    })

    it('check handleDelete', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(orders, {localVue, router});
        wrapper.setData({
            msgList: [{ mission_id: 3 }],
            size: 1
        })
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.handleDelete(0, {mission_id: 3});
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check handleDelete Fail', () => {
        const oldXml = window.XMLHttpRequest;
        const wrapper = mount(orders, {localVue, router});
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.handleDelete(0, {mission_id: 3});
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check warnDDL', () => {
        const wrapper = mount(orders, {localVue, router});
        wrapper.vm.warnDDL({row: {deadline: convertTime(new Date().getTime())}, rowIndex: 2})
    })

    it('check mount', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlMount);
        const wrapper = mount(orders, {localVue, router});
        wrapper.setData({ msgList: [], size: 0 })
        wrapper.vm.$mount();
        mockXmlMount.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})
