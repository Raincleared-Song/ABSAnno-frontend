import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import answer_question from "@/components/answer_question";
import CheckboxGroup from "@/components/questions/checkbox_group";

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);
const router = new VueRouter();

describe('answer_question', async function () {

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

    it('question without image', async function () {
        const chosenGroup = wrapper.findComponent(CheckboxGroup);
        expect(chosenGroup.exists()).toBeTruthy();
        expect(chosenGroup.props('editable')).toBe(false);
        expect(chosenGroup.props('question')).toBe(wrapper.vm.nowQuestion);
        expect(chosenGroup.props('has_image')).toBe(false);
    });
});