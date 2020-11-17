import check_group from "@/components/questions/checkbox_group";
import judgement_group from "@/components/questions/judgement_group"
import text_edit from "@/components/questions/text_edit"
import answer_question from "@/components/answer_question";
import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import CheckboxGroup from "@/components/questions/checkbox_group";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('checkbox_group', () => {
    it('Check data', () => {
        const wrapper = mount(check_group, {localVue, router});
        expect(wrapper.vm.optionCode).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    })
    it('Check question', () => {
        const wrapper = mount(check_group, {localVue, router});
        expect(wrapper.props().question).toStrictEqual({
            id: 0,
            type: 'chosen',
            description: "",
            options: [],
            new_option: "",
            answer: [],
            image: ""
        })
    })
    it('Check onChangeImage', () => {
        const wrapper = mount(check_group, {localVue, router});
        wrapper.vm.onChangeImage({url: 'test'});
    })
})

describe('judgement_group', () => {
    it('Check question', () => {
        const wrapper = mount(judgement_group, {localVue, router});
        expect(wrapper.props().question).toStrictEqual({
            index: 0,
            type: 'chosen',
            description: "",
            answer: "",
            image: ""
        })
    })
    it('check onChangeImage', () => {
        const wrapper = mount(judgement_group, {localVue, router});
        wrapper.vm.onChangeImage({url: 'test'});
        expect(wrapper.vm.image_url).toBe('test')
    })
    it('check onRemoveImage', () => {
        const wrapper = mount(judgement_group, {localVue, router});
        wrapper.vm.onRemoveImage({url: 'test'});
        expect(wrapper.vm.image_url).toBe('')
    })
})

describe('text_edit', () => {
    it('Check Text Edit', () => {
        const wrapper = mount(text_edit, {localVue, router});
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

const mockXmlSwitch = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {ret: 1, type: 'chosen', description: '', options: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSwitchImage = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {ret: 1, type: 'chosen-image', description: '', options: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlError = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: JSON.stringify(
            {ret: 1, type: 'chosen', description: '', options: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('answer_question', () => {
    it('question without image', () => {
        const wrapper = shallowMount(answer_question, {
            localVue,
            router,
            propsData: { username: 'test', power: 1 },
            data() {
                return {
                    nowQuestion: {
                        index: 0,
                        type: 'chosen',
                        description: 'test description',
                        has_image: false
                    }
                }
            }
        });
        const chosenGroup = wrapper.findComponent(CheckboxGroup);
        expect(chosenGroup.exists()).toBeTruthy();
        expect(chosenGroup.props('editable')).toBe(false);
        expect(chosenGroup.props('question')).toBe(wrapper.vm.nowQuestion);
        expect(chosenGroup.props('has_image')).toBe(false);
    })
    it('test submit', () => {
        const wrapper = shallowMount(answer_question, {localVue, router})
        wrapper.setData({questions: [{type: 'chosen', answer: ['A', 'B']}]});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('test submit2', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        wrapper.setData({questions: [{type: 'fill', answer: 'A'}]});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('test switch', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSwitch);
        wrapper.vm.switchToNext();
        mockXmlSwitch.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('test switch image', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSwitchImage);
        wrapper.vm.switchToNext();
        mockXmlSwitchImage.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('test switch id', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        wrapper.setData({nowQuestionIndex: 2});
        wrapper.vm.switchToNext();
    })
    it('test switch error', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlError);
        wrapper.vm.switchToNext();
        mockXmlError.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('test other', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        wrapper.vm.switchToPrev();
        wrapper.vm.returnSquare();
    })
});


