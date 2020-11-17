import orders from "@/components/orders";
import convertTime from "@/utils/timestamp";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

const mockXmlMount = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {total_num: 1, rep_list: [{deadline: new Date().getDate(),
                    question_form: 'chosen', type: ''}]})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('order', () => {
    it('check data', () => {
        const wrapper = mount(orders, {localVue, router});
        expect(wrapper.vm.current).toBe(1);
        expect(wrapper.vm.totalMsgNum).toBe(1);
        expect(wrapper.vm.pagesize).toBe(12);
        expect(wrapper.vm.getMsgNum).toBe(0);
        expect(wrapper.vm.groundType).toBe(1);
        expect(wrapper.vm.isRouterAlive).toBe(true);
    })
    it('check handleDelete', () => {
        const wrapper = mount(orders, {localVue, router});
        wrapper.vm.handleDelete(0, {mission_id: 3});
    })
    it('check warnDDL', () => {
        const wrapper = mount(orders, {localVue, router});
        wrapper.vm.warnDDL({row: {deadline: convertTime(new Date().getTime())}, rowIndex: 2})
    })
    it('check mount', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlMount);
        const wrapper = mount(orders, {localVue, router});
        wrapper.vm.$mount();
        mockXmlMount.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})
