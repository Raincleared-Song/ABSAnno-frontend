import checkbox_group from '@/components/questions/checkbox_group'
import judgement_group from "@/components/questions/judgement_group"
import text_edit from "@/components/questions/text_edit"
import answer_question from "@/components/answer_question";
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('checkbox_group', () => {
    it('Check data', () => {
        const wrapper = mount(checkbox_group);
        expect(wrapper.vm.optionCode).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    })
    it('Check question', () => {
        const wrapper = mount(checkbox_group);
        expect(wrapper.props().question).toStrictEqual({
            id: 0,
            type: 'choice',
            description: "",
            options: [],
            new_option: "",
            answer: []
        })
    })
})

describe('judgement_group', () => {
    it('Check question', () => {
        const wrapper = mount(judgement_group);
        expect(wrapper.props().question).toStrictEqual({
            index: 0,
            type: 'judgement',
            description: "",
            answer: ""
        })
    })
})

describe('text_edit', () => {
    it('check question', () => {
        const wrapper = mount(text_edit);
        expect(wrapper.props().question).toStrictEqual({
            id: 0,
            type: 'text',
            description: "",
            answer: ""
        })
    })
})

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: '123456',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('answer_question', () => {
    it('test submit', () => {
        const wrapper = mount(answer_question, {
            localVue,
            router
        })
        wrapper.setData({
            missionId: 1,
            totalNum: 5,
            questions: [{
                index: 0,
                type: 'chosen',
                description: 'test',
                answer: ['A', 'B', 'C']
            }],
            nowQuestionIndex: 0,
            nowQuestion: null
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
});


