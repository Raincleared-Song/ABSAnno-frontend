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

const mockXmlPostSuccess = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: 'Success'}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

const mockXmlPostFail = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 400,
    responseText: JSON.stringify({code: 400, data: 'Fail'}),
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

    it('click edit mission tab', async function () {
        const tabEdit = tab.findAllComponents({ name: 'ATabPane' }).at(0);
        await tabEdit.trigger('click');
        expect(tabEdit.findComponent({ name: 'ASteps' }).exists()).toBe(true);
    });

    it('check post chosen without image', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'chosen', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: false
            },
            questions: [], current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post fill without image', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'fill', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: false
            },
            questions: [{ description: 'test', answer: 'test' }],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post chosen with image', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'chosen', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: true
            },
            questions: [{ description: 'test', options: ['A', 'B'], answer: 'A', image: { name: 'test.png' }}],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post chosen with image but missing', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'chosen', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: true
            },
            questions: [{ description: 'test', options: ['A', 'B'], answer: 'A'}],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post chosen with cover', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'chosen', info: 'test info',
                cover: { name: 'test.png' }, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: true, has_image: false
            },
            questions: [{ description: 'test', options: ['A', 'B'], answer: 'A', image: { name: 'test.png' }}],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostSuccess);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostSuccess.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post not valid', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'fill', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: false
            },
            questions: [{ description: 'test', options: ['A', 'B'], answer: 'A'}],
            current: 0, mission_info_valid: false, submitting: false
        })
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
    })

    it('check post chosen fail', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'fill', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: false
            },
            questions: [{ description: 'test', answer: 'test' }],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check post chosen with image fail', () => {
        wrapper.setData({
            mission: {
                name: 'test', type: 'fill', info: 'test info',
                cover: null, min: 10, ddl: moment(new Date().setDate(new Date().getDate() + 2)),
                tags: ['青年', '道德准则'], reward: 5, retrieve: 24,
                check_way: 'auto', has_cover: false, has_image: true
            },
            questions: [{ description: 'test', answer: 'test', image: { name: 'test.png' } }],
            current: 0, mission_info_valid: true, submitting: false
        })
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlCsrf);
        wrapper.vm.mission.ddl.format = jest.fn((str) => '2020-11-05');
        wrapper.vm.submit();
        window.XMLHttpRequest = jest.fn(() => mockXmlPostFail);
        mockXmlCsrf.onreadystatechange();
        mockXmlPostFail.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })

    it('check other', () => {
        wrapper.vm.updateValid(true);
        expect(wrapper.vm.mission_info_valid).toBeTruthy();
    })
});