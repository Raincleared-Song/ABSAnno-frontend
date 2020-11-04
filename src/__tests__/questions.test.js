import check_group from "@/components/questions/checkbox_group";
import judgement_group from "@/components/questions/judgement_group"
import text_edit from "@/components/questions/text_edit"
import answer_question from "@/components/answer_question";
import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import choice_group from "@/components/questions/choice_group";

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
        const chosenGroup = wrapper.findComponent(choice_group);
        expect(chosenGroup.exists()).toBeTruthy();
        expect(chosenGroup.props('editable')).toBe(false);
        expect(chosenGroup.props('question')).toBe(wrapper.vm.nowQuestion);
        expect(chosenGroup.props('has_image')).toBe(false);
    })

    it('test submit', () => {
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
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.submit();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
});


