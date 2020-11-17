import basic_info from "@/components/userpage/basic_info";
import edit_info from "@/components/userpage/edit_info";
import history from "@/components/userpage/history";
import message from "@/components/userpage/message";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

const mockXmlBasic = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
        {userScore: '1', userWeight: '2', userAnsNum: '3'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('basic_info', () => {
    it('Check data', () => {
        const wrapper = mount(basic_info, {localVue, router});
        expect(wrapper.vm.userCoin).toBe(-1)
        expect(wrapper.vm.userWeight).toBe(-1)
        expect(wrapper.vm.userAnsNum).toBe(-1)
    })
    it('Check mounted', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlBasic);
        const wrapper = mount(basic_info, {localVue, router});
        wrapper.vm.$mount();
        mockXmlBasic.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})

describe('edit_info', () => {
    it('Check data', () => {
        const wrapper = mount(edit_info, {localVue, router});
        let info = wrapper.vm.user_info;
        expect(info.question_form).toStrictEqual([])
        expect(info.question_num).toStrictEqual([5, 50])
        expect(wrapper.vm.questionForms).toStrictEqual([
            { label: '选择题', value: 'chosen' },
            { label: '文字题', value: 'fill' }
        ])
    })
    it('check functions', () => {
        const wrapper = mount(edit_info, {localVue, router});
        wrapper.vm.submit();
        wrapper.vm.cancel();
        wrapper.vm.formatter(4);
        wrapper.vm.$mount();
    })
})

const mockXmlHistory = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {totalNum: 1, mission_list: [{id: 1, name: 'a', question_form: 'chosen', info: '',
                    user: 'a', question_num: 2, ret_time: 1569507418772, reward: 50}]})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('history', () => {
    it('check data', () => {
        const wrapper = mount(history, {localVue, router});
        expect(wrapper.vm.totalNum).toBe(0);
        expect(wrapper.vm.missionList).toStrictEqual([]);
        expect(wrapper.vm.pagination.pageSize).toStrictEqual(3);
    })
    it('check function', () => {
        const wrapper = mount(history, {localVue, router});
        expect(wrapper.vm.type2src({question_form: ""})).toBe("")
        expect(wrapper.vm.type2src({question_form: "judgement"})).toBe("@/assets/ground/judgement2.jpg")
        expect(wrapper.vm.type2src({question_form: "chosen"})).toBe("@/assets/ground/choice2.jpg")
    })
    it('check created', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlHistory);
        const wrapper = mount(history, {localVue, router});
        wrapper.vm.$mount();
        mockXmlHistory.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})

const mockXmlMessage = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {message_num: 1, message_list: [
                {"title":"8", "content":"this is the message content", "time":1569507418772}]})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('message', () => {
    it('check data', () => {
        const wrapper = mount(message, {localVue, router});
        expect(wrapper.vm.num).toBe(0);
    })
    it('check mount', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlMessage);
        const wrapper = mount(message, {localVue, router});
        wrapper.vm.$mount();
        mockXmlMessage.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})
