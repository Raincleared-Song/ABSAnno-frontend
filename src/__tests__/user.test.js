import basic_info from "@/components/userpage/basic_info";
import edit_info from "@/components/userpage/edit_info";
import history from "@/components/userpage/history";
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
            { label: '判断题', value: 'judgement' },
            { label: '选择题', value: 'chosen' },
            { label: '文字题', value: 'text' }
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
})
