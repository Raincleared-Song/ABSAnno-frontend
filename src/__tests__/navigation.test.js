import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import navigation from "@/components/navigation";

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);

describe('navigation', function () {
    it('check tabs for not-login users', () => {
        const wrapper = shallowMount(navigation, {
            propsData: {
                username: 'test',
                power: -1
            }
        });
        const menuItems = wrapper.findAllComponents('a-menu-item');
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('登陆')).toBe(true);
        expect(menuItems.at(3).text().contains('注册')).toBe(true);
    });

    it('check tabs for ordinary users', () => {
        const wrapper = shallowMount(navigation, {
            propsData: {
                username: 'test',
                power: 0
            }
        });
        const menuItems = wrapper.findAllComponents('a-menu-item');
        expect(menuItems.at(0).text().contains('题目广场')).toBe(true);
        expect(menuItems.at(1).text().contains('规则说明')).toBe(true);
        expect(menuItems.at(2).text().contains('个人中心')).toBe(true);
        expect(menuItems.at(3).text().contains('登出')).toBe(true);
    });
});