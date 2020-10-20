<template>
    <a-list item-layout="horizontal" :data-source="userList">
        <a-list-item slot="renderItem" slot-scope="user">
<!--            <a slot="extra" v-if="user.is_banned === true">-->
<!--                <a-button type="link" @click="dealUser(user.id, 'user_free')">-->
<!--                    解禁-->
<!--                </a-button>-->
<!--                <a-button type="link" disabled>-->
<!--                    禁言-->
<!--                </a-button>-->
<!--&lt;!&ndash;            </a>&ndash;&gt;-->
            <a slot="extra">
                <div v-if="user.is_banned === 1">
                    <a-button type="link" @click="dealUser(user.id, 'user_free')">
                        解禁
                    </a-button>
                    <a-button type="link" disabled>
                        禁言
                    </a-button>
                </div>
                <div v-if="user.is_banned === 0">
                    <a-button type="link" disabled>
                        解禁
                    </a-button>
                    <a-button type="link" @click="dealUser(user.id, 'user_ban')">
                        禁言
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
                        banned
                    </a-tag>
                </a>
                <a slot="description">
                    <div style="color: #5e5e5e">
                        信誉：{{user.weight}}
                        <a-divider type="vertical" />
                        积分：{{user.score}}
                        <a-divider type="vertical" />
                        已完成任务：{{user.fin_num}}
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
    import dealAdmin from "@/utils/admin"
    export default {
        name: "banuser",
        data(){
            return {
                userList:[],
                current: 1,
                totalUserNum: 1,
                pageSize: 20,
                getUserNum:0,
                // thisPageSize:12,
            }
        },
        props:[
            "username",
            "power",
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
                this.current = pageNumber;
                console.log('Users Page: ', pageNumber);
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201){
                        let res = JSON.parse(xhr.responseText);
                        let data = JSON.parse(res.data.replace(/'/g,'"'));
                        console.log(data)
                        context.totalUserNum = data.total;
                        // context.thisPageSize = data.num - context.getUserNum;
                        context.userList = data.user_list;
                        context.getUserNum = data.num;
                    }
                };
                console.log("backend/alluser?now_num="+this.getUserNum.toString());
                xhr.open("get","backend/alluser?now_num="+this.getUserNum.toString());
                xhr.send();
            },
        },
        mounted:function () {   //自动触发写入的函数
            this.onChange(1);
        },
    }
</script>

<style scoped>

</style>