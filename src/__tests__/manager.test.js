import banuser from "@/components/manager/banuser";
import userManage from "@/components/manager/userManage";
import manager from "@/components/manager";
import {createLocalVue, mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)
localVue.use(Antd)
const router = new VueRouter()

const mockXmlBan = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {totalUserNum : 0, userList: [], getUserNum: 0})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('banuser', () => {
    it('check data', () => {
        const wrapper = mount(banuser, {localVue, router})
        expect(wrapper.vm.current).toBe(1)
        expect(wrapper.vm.totalUserNum).toBe(1)
        expect(wrapper.vm.pageSize).toBe(20)
        expect(wrapper.vm.getUserNum).toBe(0)
    })
    it('test dealUser', () => {
        const wrapper = mount(banuser, {localVue, router})
        wrapper.setData({
            userList: [{id: 1, is_banned: 0}, {id: 1, is_banned: 1}, {id: 2, is_banned: 0}]
        })
        wrapper.vm.dealUser(1, 'test')
    })
    it('test onChange', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlBan);
        const wrapper = mount(banuser, {localVue, router});
        wrapper.vm.$mount();
        mockXmlBan.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})

const mockXmlUser = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 201,
    responseText: JSON.stringify({code: 201, data: JSON.stringify(
            {apply_num : 1, apply_list: [{pub_time: 1569507418772}]})}),
    onreadystatechange: () => {},
    setRequestHeader: () => {}
};

describe('userManage', () => {
    it('check data', () => {
        const wrapper = mount(userManage, {localVue, router});
        expect(wrapper.vm.current).toBe(1);
        expect(wrapper.vm.num).toBe(0);
    })
    it('check onChange', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlUser);
        const wrapper = mount(userManage, {localVue, router});
        wrapper.vm.onChange(1);
        mockXmlUser.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
    it('check dealUser', () => {
        const oldXml = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => mockXmlUser);
        const wrapper = mount(userManage, {localVue, router});
        wrapper.vm.dealUser(1, 'test');
        mockXmlUser.onreadystatechange();
        window.XMLHttpRequest = oldXml;
    })
})

describe('Manager', () => {
    it('test data', () => {
        const wrapper = mount(manager, {localVue, router});
        wrapper.vm.$mount();
    })
})
