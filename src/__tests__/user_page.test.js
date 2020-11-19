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
        const wrapper = mount(user_page, { localVue, router });
        expect(wrapper.vm.editing).toBe(false);
    })

    it('check onApplyUpgrade', () => {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.onApplyUpgrade();
    })

    it('test beforeUploadAvatar, test case', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'image/jpeg',
            size: 1024
        })
    })

    it('test beforeUploadAvatar, fail case 1', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'image/jpeg',
            size: 102400000
        })
    })

    it('test beforeUploadAvatar, fail case 2', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.beforeUploadAvatar({
            type: 'text/json',
            size: 1024
        })
    })

    it('test onChangeAvatar', function () {
        const wrapper = mount(user_page, { localVue, router });
        wrapper.vm.onChangeAvatar("/image/test");
        expect(wrapper.emitted('change-avatar')).toBeTruthy();
    })
})
