import check_group from "@/components/questions/checkbox_group";
import judgement_group from "@/components/questions/judgement_group"
import text_edit from "@/components/questions/text_edit"
import answer_question from "@/components/answer_question";
import choice_group from "@/components/questions/choice_group";
import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('choice_group', function () {

    it('check data', function () {
        const wrapper = mount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    index: 0,
                    type: 'chosen',
                    description: "",
                    options: ['A', 'B', 'C'],
                    new_option: "",
                    answer: "",
                    has_pre_ans: false,
                    image: undefined
                },
                editable: true,
                has_image: false
            }
        })
        expect(wrapper.vm.$data).toStrictEqual({
            optionCode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        })
    })

    it('check onChangeImage', function () {
        const wrapper = shallowMount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    index: 0,
                    type: 'chosen',
                    description: "",
                    options: ['A', 'B', 'C'],
                    new_option: "",
                    answer: "",
                    has_pre_ans: false,
                    image: undefined
                },
                editable: true,
                has_image: true
            }
        })
        wrapper.vm.onChangeImage({ name: "test.png", size: 2048 })
        expect(wrapper.props().question.image).toStrictEqual({ name: "test.png", size: 2048 })
    })

    it('check onChangeImage, fail case 1', function () {
        const wrapper = shallowMount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    index: 0,
                    type: 'chosen',
                    description: "",
                    options: ['A', 'B', 'C'],
                    new_option: "",
                    answer: "",
                    has_pre_ans: false,
                    image: undefined
                },
                editable: true,
                has_image: true
            }
        })
        wrapper.vm.onChangeImage({ name: "test.json", size: 2048 })
        expect(wrapper.props().question.image).toBeFalsy();
    })

    it('check onChangeImage, fail case 2', function () {
        const wrapper = shallowMount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    index: 0,
                    type: 'chosen',
                    description: "",
                    options: ['A', 'B', 'C'],
                    new_option: "",
                    answer: "",
                    has_pre_ans: false,
                    image: undefined
                },
                editable: true,
                has_image: true
            }
        })
        wrapper.vm.onChangeImage({ name: "test.png", size: 20480000 })
        expect(wrapper.props().question.image).toBeFalsy();
    })

    it('test onRemoveImage', function () {
        const wrapper = shallowMount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    options: ['A', 'B', 'C'],
                    image: "123.png"
                }
            }
        })
        wrapper.vm.onRemoveImage();
        expect(wrapper.props().question.image).toBe(null);
    })

    it('test watch question.has_pre_ans', async function () {
        const wrapper = mount(choice_group, {
            localVue,
            router,
            propsData: {
                question: {
                    options: ['A', 'B', 'C'],
                    answer: "ha",
                    has_pre_ans: true
                }
            }
        })
        wrapper.vm.$watch(
            'question.has_pre_ans', function (newVal, oldVal) {
                if (newVal === false && oldVal === true)
                    this.question.answer = "";
            })
        await wrapper.setProps({
            question: {
                options: ['A', 'B', 'C'],
                answer: "ha",
                has_pre_ans: true
            }})
        await wrapper.setProps({
            question: {
                options: ['A', 'B', 'C'],
                answer: "ha",
                has_pre_ans: false
            }})
        expect(wrapper.props().question.answer).toBe("")
    })
})

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
        const wrapper = mount(text_edit, { localVue, router });
        expect(wrapper.vm.$props).toStrictEqual({
            question: {
                id: 0,
                type: 'chosen',
                description: "",
                new_option: "",
                answer: "A||B",
                image: ""
            },
            editable: false,
            has_image: false,
            template: 0
        });
    })

    it('test onChangeImage', function () {
        const wrapper = mount(text_edit, {
            localVue,
            router,
            propsData: {
                question: { image: "" }
            }
        })
        wrapper.vm.onChangeImage({ name: "test.png", size: 2048 });
        expect(wrapper.props().question.image).toStrictEqual({ name: "test.png", size: 2048 });
    })

    it('test onRemoveImage', function () {
        const wrapper = mount(text_edit, {
            localVue,
            router,
            propsData: {
                question: { image: "" }
            }
        })
        wrapper.vm.onRemoveImage();
        expect(wrapper.props().question.image).toBe(null);
    })

    it('test watch question.has_pre_ans', async function () {
        const wrapper = mount(text_edit, { localVue, router })
        wrapper.vm.$watch(
            'question.has_pre_ans', function (newVal, oldVal) {
                if (newVal === false && oldVal === true)
                    this.question.answer = "";
            })
        await wrapper.setProps({
            question: { has_pre_ans: true }
        })
        await wrapper.setProps({
            question: { has_pre_ans: false }
        })
        expect(wrapper.props().question.answer).toBe("")
    })
})

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: 'csrf',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSwitch = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {ret: 1, type: 'chosen', description: '', choices: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSwitchImage = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {ret: 1, type: 'chosen-image', description: '', choices: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSwitchFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: JSON.stringify(
            {ret: 1, type: 'chosen-image', description: '', choices: 'A||B||C'})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSubmitSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: 'Success'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSubmitFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 400, data: 'Fail'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlSubmitCreated = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {total: 1, ret: 1, type: 'chosen-image', description: '', choices: 'A||B||C', image_url: ''})}),
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
                    nowQuestion: { index: 0, type: 'chosen', description: 'test description', has_image: false }
                }
            }
        });
        const chosenGroup = wrapper.findComponent(choice_group);
        expect(chosenGroup.exists()).toBeTruthy();
        expect(chosenGroup.props('editable')).toBe(false);
        expect(chosenGroup.props('question')).toBe(wrapper.vm.nowQuestion);
        expect(chosenGroup.props('has_image')).toBe(false);
    })

    it('test submit', () => {
        const wrapper = mount(answer_question, {localVue, router})
        wrapper.setData({questions: [{type: 'chosen', answer: ['A', 'B']}]});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlSubmitSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlSubmitSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test submit fail', () => {
        const wrapper = mount(answer_question, {localVue, router})
        wrapper.setData({questions: [{type: 'chosen', answer: ['A', 'B']}]});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlSubmitFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlSubmitFail.onreadystatechange();
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

    it('test switch error', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSwitchFail);
        wrapper.vm.switchToNext();
        mockXmlSwitchImage.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('test switch id', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        wrapper.setData({nowQuestionIndex: 2});
        wrapper.vm.switchToNext();
    })

    it('test other', () => {
        const wrapper = shallowMount(answer_question, {localVue, router});
        wrapper.vm.switchToPrev();
    })

    it('test created', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlSubmitCreated);
        mount(answer_question, {localVue, router});
        mockXmlSubmitCreated.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
});


