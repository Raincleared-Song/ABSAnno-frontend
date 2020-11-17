import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import edit_question from "@/components/edit_question";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('edit_question', function () {

    it('check data', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { name: 'test' },
                questions: []
            }
        })
        expect(wrapper.vm.$data).toStrictEqual({
            nowQuestionIndex: 0, // 为了配合导航条，这个变量是从1开始的！
            nowQuestion: null
        })
    })

    it('check addQuestion for chosen', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'chosen', name: 'test' },
                questions: []
            }
        })
        wrapper.vm.addQuestion();
    })

    it('check addQuestion for fill', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: []
            }
        })
        wrapper.vm.addQuestion();
    })

    it('test removeQuestion', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: [{ description: 'test' }]
            }
        })
        wrapper.vm.removeQuestion();
        expect(wrapper.props().questions.length).toBe(0);
    })

    it('test switchTo 1', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: [{ description: 'test' }]
            }
        })
        wrapper.vm.switchTo(1)
    })

    it('test switchTo 2', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: []
            }
        })
        wrapper.vm.switchTo(0)
    })

    it('test addOption', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: [{ index: 0, description: 'test', options: [] }]
            }
        })
        wrapper.vm.addOption(0, 'test')
    })

    it('test removeOption', function () {
        const wrapper = shallowMount(edit_question, {
            localVue,
            router,
            propsData: {
                mission_info: { type: 'fill', name: 'test' },
                questions: [{ index: 0, description: 'test', options: ['A', 'B'] }]
            }
        })
        wrapper.vm.removeOption(0, 0)
    })
});