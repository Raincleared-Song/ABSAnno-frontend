import {mount, createLocalVue, shallowMount} from '@vue/test-utils';
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import create_mission from "@/components/create_mission";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

describe('create_mission', function () {

    it('test create_mission data', function () {
        const wrapper = mount(create_mission, {
            localVue,
            router,
            propsData: {
                mission_info: {}
            }
        })
        expect(wrapper.vm.$data).toStrictEqual({
            rules: {
                name: [{ required: true, message: 'Mission name cannot be null.', trigger: 'blur' }],
                type: [{ required: true, message: 'Mission type cannot be null.', trigger: 'blur' }],
                has_image: [{ required: true, message: 'Has-Image cannot be null.', trigger: 'blur' }],
                min: [{ required: true, message: 'Mission minimum annotation cannot be null.', trigger: 'blur' }],
                ddl: [{ required: true, message: 'Mission deadline cannot be null.', trigger: ['blur', 'change'] }],
                reward: [{ required: true, message: 'Mission reward cannot be null.', trigger: 'blur' }],
                retrieve: [{ required: true, message: 'Mission retrieve time cannot be null.', trigger: 'blur' }],
                check_way: [{ required: true, message: 'Mission check way cannot be null.', trigger: 'blur' }]
            },
            tagsTotal: [
                "青年", "中年", "老年", "学生",
                "教师", "上班族", "研究者",
                "人脸识别", "图片识别", "文字识别",
                "AI写作", "翻译校对", "文本分析",
                "生活场景", "工作场景", "购物", "运动", "旅游",
                "动物", "道德准则", "地理", "科学", "心理学"
            ]
        })
    })

    it('test create_mission validation - fail case', function () {
        const wrapper = mount(create_mission, {
            localVue,
            router,
            propsData: {
                mission_info: {
                    name: undefined,
                    type: 'chosen',
                    info: 'random',
                    min: 10,
                    ddl: undefined,
                    tags: ['student'],
                    reward: 10,
                    retrieve: 14,
                    check_way: 'auto',
                    has_image: false
                }
            }
        })
    })
    it('test other', () => {
        const wrapper = mount(create_mission, {
            localVue,
            router,
            propsData: {
                mission_info: {
                    name: undefined,
                    type: 'chosen',
                    info: 'random',
                    min: 10,
                    ddl: undefined,
                    tags: ['student'],
                    reward: 10,
                    retrieve: 14,
                    check_way: 'auto',
                    has_image: false
                }
            }
        });
        wrapper.vm.disabledDate(1);
        wrapper.vm.onChangeCover({ type: 'image/png', size: 2048, name: 'test.png' });
        wrapper.vm.onRemoveCover();
    })
})