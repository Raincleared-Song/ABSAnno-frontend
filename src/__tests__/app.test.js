import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import App from "@/App";
import VueRouter from "vue-router";

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);

describe('App', () => {
    it('App default power', () => {
        const wrapper = shallowMount(App, { localVue });
        expect(wrapper.vm.power).toBe(-1);
    });
})