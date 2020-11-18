<template>
    <div v-if="items.length" class="lateral-sliding">
        <div class="lateral-sliding-item" v-for="item in items" :key="item">
            <div class="each-img">
                <a-card size="small" :title="item.title">
                    <div style="font-size: 15px; color:#323232">{{item.content}}</div>
                    <div style="font-size: 12px; color:#808080; float:right">{{item.time}}</div>
                </a-card>
            </div>
        </div>
    </div>
    <a-empty v-else :description="'您还没有消息'"/>
</template>

<script>
    import convertTime from "../../utils/convertTime";
    import getBackend from "../../utils/getBackend";

    export default {
        name: "message",
        data() {
            return {
                num: 0,
                items:[],
            }
        },  // end of data
        props: [
            'power',
            'username',
            'avatar'
        ],  // end of props
        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    console.log(jsonObj.data);
                    if (jsonObj.data !== 'No message to show!') {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        console.log(data)
                        this.num = data.message_num;
                        this.items = data.message_list;
                        var j;
                        for (j = 0; j < this.num; j += 1) {
                            this.items[j].time = convertTime(this.items[j].time)
                        }
                    }
                }
            };
            getBackend("/backend/message", {}, onRespond);
        },
    }
</script>

<style scoped>
    .lateral-sliding {
        display: flex;
        overflow-y: hidden;
        overflow-x: scroll;
    }
    .lateral-sliding-item {
        display: flex;
        margin-right: 8px;
    }
    .each-img {
        width: 180px;
    }

</style>