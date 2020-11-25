<template>
    <a-list item-layout="horizontal" :data-source="userList">
        <a-list-item slot="renderItem" slot-scope="user">
            <a slot="extra">
                <div v-if="user.is_banned === 1">
                    <a-button type="link" @click="dealUser(user.id, 'user_free')">
                        解禁
                    </a-button>
                    <a-button type="link" disabled>
                        封禁
                    </a-button>
                </div>
                <div v-if="user.is_banned === 0">
                    <a-button type="link" disabled>
                        解禁
                    </a-button>
                    <a-button type="link" @click="dealUser(user.id, 'user_ban')">
                        封禁
                    </a-button>
                </div>
            </a>
            <a-list-item-meta>
                <a slot="title" >{{ user.name }}
                    <a-tag v-if="user.power === 0" color="green">
                        普通用户
                    </a-tag>
                    <a-tag v-if="user.power === 1" color="orange">
                        VIP用户
                    </a-tag>
                    <a-tag v-if="user.is_banned === 1" color="#f50">
                        封禁
                    </a-tag>
                </a>
                <a slot="description">
                    <div style="color: #5e5e5e">
                        信誉积分：{{ user.weight }}
                        <a-divider type="vertical" />
                        金币值：{{ user.coin }}
                        <a-divider type="vertical" />
                        已完成任务：{{ user.fin_num }}
                    </div>
                </a>
                <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script>
    import dealAdmin from "../../utils/dealAdmin"
    import getBackend from "../../utils/getBackend"
    export default {
        name: "banuser",
        data(){
            return {
                userList:[],
                current: 1,
                totalUserNum: 1,
                pageSize: 20,
                getUserNum:0,
            }
        },
        props:[
            "username",
            "power",
            "avatar"
        ],
        methods:{
            dealUser(id, method){
                this.userList.forEach(function(item, index, arr) {
                    if(item.id === id) {
                        if(item.is_banned === 1){
                            item.is_banned = 0;
                        }
                        else{
                            item.is_banned = 1;
                        }
                    }
                });
                dealAdmin(id, method);
            },

            onChange(pageNumber) {
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        console.log(data)
                        this.totalUserNum = data.total;
                        this.userList = data.user_list;
                        this.getUserNum = data.num;
                    }
                };
                getBackend("backend/alluser", {"now_num":this.getUserNum.toString()}, onRespond);

            },
        },
        mounted:function () {
            this.onChange(1);
        },
    }
</script>

<style scoped>

</style>