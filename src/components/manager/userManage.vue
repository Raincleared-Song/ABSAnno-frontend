<template>
    <a-list item-layout="horizontal" :data-source="userList">
        <a-list-item slot="renderItem" slot-scope="user" :v-if="user.accept === 0">
            <a slot="extra">
                <div>
                    <a-button type="link" @click="dealUser(user.id, 'Accept')">
                        同意
                    </a-button>
                    <a-button type="link" style="color:#ff4d4f" @click="dealUser(user.id, 'Rejected')">
                        拒绝
                    </a-button>
                </div>
            </a>
            <a-list-item-meta>
                <a slot="title" >{{ user.user_name }}</a>
                <a slot="description">
                    <div style="color: #5e5e5e">
                        申请时间：{{user.pub_time}}
                        <a-divider type="vertical" />
                        信誉积分：{{user.user_weight}}
                        <a-divider type="vertical" />
                        金币值：{{user.user_coin}}
                        <a-divider type="vertical" />
                        已完成任务：{{user.user_fin_num}}
                    </div>
                </a>
                <a-avatar
                        v-if="user.user_avatar===''"
                        slot="avatar"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605727363764&di=c49a3474a398e8834d65a65df2537d43&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg"
                />
                <a-avatar
                        v-else
                        slot="avatar"
                        :src="user.user_avatar"
                />
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script>
    import postBackend from "../../utils/postBackend"
    import getBackend from "../../utils/getBackend"
    import convertTime from "../../utils/convertTime";
    export default {
        name: "userManage",
        data(){
            return {
                userList:[],
                current: 1,
                num: 0,
            }
        },
        props:[
            "username",
            "power",
            "avatar"
        ],
        methods:{
            dealUser(id, method){
                postBackend("backend/powerup",
                    {p_id: id.toString(),method:method},
                    jsonObj => {
                        if (jsonObj.code === 201) {
                            console.log("Admin Success")
                            this.onChange()
                            this.$emit("reload")
                        } else {
                            console.log("can't admin")
                        }
                    });
            },

            onChange() {
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        console.log(data)
                        this.num = data.apply_num;
                        this.userList = data.apply_list;
                        var i;
                        for(i = 0; i < this.num; i+=1){
                            this.userList[i].pub_time = convertTime(this.userList[i].pub_time)
                        }
                    }
                };
                getBackend("backend/applyshow", {}, onRespond);
            },
        },
        mounted:function () {
            this.onChange();
        },
    }
</script>

<style scoped>

</style>