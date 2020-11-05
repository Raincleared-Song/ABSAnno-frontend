import { mount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import mission_field from "@/components/mission_field";
import ATabs from "ant-design-vue/lib/tabs/tabs";
import create_mission from "@/components/create_mission";
import edit_question from "@/components/edit_question";
import upload_mission from "@/components/upload_mission";
import moment from 'moment';

let localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Antd);
localVue.use(VueRouter);
localVue.use(moment);

const routes = [
    {
        path: '/mission',
        component: mission_field,
        redirect: '/mission/create',
        children: [
            { path: 'create', component: create_mission },
            { path: 'edit', component: edit_question },
            { path: 'upload', component: upload_mission }
        ]
    }
]

const router = new VueRouter({
    routes
});

const mockXmlCsrf = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: '123456',
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('mission_field', function () {

    const wrapper = mount(mission_field, {
        localVue,
        router,
        propsData: { username: 'test' }
    });
    const tab = wrapper.findComponent(ATabs);

    it('ATabs has two tabs', function () {
        expect(tab.findAllComponents({ name: 'ATabPane' })).toHaveLength(2);
    })

    it('click edit mission tab', async function () {
        const tabEdit = tab.findAllComponents({ name: 'ATabPane' }).at(0);
        await tabEdit.trigger('click');
        expect(tabEdit.findComponent({ name: 'ASteps' }).exists()).toBe(true);
    });

    it('click upload mission tab', async function () {
        const tabUpload = tab.findAllComponents({ name: 'ATabPane' }).at(1);
        await tabUpload.trigger('click');
        expect(tabUpload.find('.upload-mission').exists()).toBe(false); // TODO: true
    });

    it('emit submit-info', async function () {
        wrapper.vm.$emit('submit-info');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('submit-info')).toBeTruthy();
        // expect(wrapper.vm.$route.path).toBe('/mission/edit');
    });

    it('emit submit-questions', async function () {
        wrapper.vm.$emit('submit-questions');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('submit-questions')).toBeTruthy();
    })

    it('check postFile csrf', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        mockXmlCsrf.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
});