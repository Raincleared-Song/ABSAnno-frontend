<template>
    <div class="lateral-sliding">
        <div class="lateral-sliding-item" v-for="item in items" :key="item">
            <div class="each-img">
                <a-card size="small" :title="item.title">
                    <div style="font-size: 15px; color:#323232">{{item.content}}</div>
                    <div style="font-size: 12px; color:#808080; float:right">{{item.time}}</div>
                </a-card>
            </div>
        </div>
    </div>

</template>

<script>
    import convertTime from "../../utils/timestamp";
    import getBackend from "../../utils/getBackend";

    export default {
        name: "message",
        data() {
            return {
                num: 7,
                items:[],
            }
        },  // end of data
        props: [
            'power',
            'username'
        ],  // end of props
        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                    console.log(data)
                    this.num = data.message_num;
                    this.items = data.message_list;
                    var i;
                    for(i = 0; i < this.num; i+=1){
                        this.items[i].time = convertTime( this.items[i].time)
                    }
                }
            };
            getBackend("backend/message", {}, onRespond);
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