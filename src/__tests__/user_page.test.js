import user_page from "@/components/user_page";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('user_page', () => {
    it('check data', () => {
        const wrapper = mount(user_page, {localVue, router});
        expect(wrapper.vm.editing).toBe(false);
    })
    it('check onApplyUpgrade', () => {
        const wrapper = mount(user_page, {localVue, router});
        wrapper.vm.onApplyUpgrade();
    })
})
