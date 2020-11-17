import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import publicate from "@/components/publicate"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('publicate', function () {
    it('test data', function () {
        const wrapper = mount(publicate, {
            localVue,
            router,
            propsData: {
                username: 'test',
                power: 0,
                avatar: 'test'
            }
        })
        expect(wrapper.vm.$data).toStrictEqual({
            activeKey: [],
            pubList:[],
            detailedInfo:[],
        })
    })
})