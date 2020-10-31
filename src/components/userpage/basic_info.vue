<template>
    <div>
        <a-descriptions title="用户信息">
            <a-descriptions-item label="用户名">
                {{this.username}}
            </a-descriptions-item>
            <a-descriptions-item label="用户积分">
                {{this.user_score}}
            </a-descriptions-item>
            <a-descriptions-item label="用户信誉">
                {{this.user_weight}}
            </a-descriptions-item>
            <a-descriptions-item label="用户答题数量/完成任务数">
                {{this.user_ans_num}}
            </a-descriptions-item>
            <a-descriptions-item label="Credit">
                Credit
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
    export default {
        name: "basic_info",
        method: {
            getUserInfo (content) {
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201) {
                        let info = JSON.parse(xhr.responseText)
                        console.log(info)
                        console.log(content)
                        if (content === "history")
                            context.parseHistory(info)
                        else if (content === "user")
                            context.parseUserInfo(info)
                        else if (content === "mission")
                            context.parseMission(info)
                        // else if (content === "editUser)

                    }
                }
                xhr.open("get", "backend/user?method="+content.toString())
                xhr.send()
            },
            parseUserInfo: function (info) {
                let data = JSON.parse(info.data.replace(/'/g,'"'))
                console.log(data.name, data.num, data.weight, data.score)
                this.user_name = data.name
                this.user_ans_num = data.num
                this.user_weight = data.weight
                this.user_score = data.score
            },

            parseHistory: function (info) {
                console.log(info)
                info = info.data.replace(/'/g, '"')
                let data = JSON.parse(info)
                console.log(data)
                this.answerListData = []
                for (let i = 0; i < data.total_num; ++i) {
                    console.log(data.mission_list[i])
                    let d = new Date()
                    d.setTime(data.mission_list[i].ret_time)
                    this.answerListData.push({
                        qName: data.mission_list[i].name,
                        qUser: data.mission_list[i].user,
                        qClass: data.mission_list[i].question_form,
                        qTime: d.toLocaleString(),
                    })
                }
            },

            parseMission: function (info) {
                let data = JSON.parse(info.data.replace(/'/g,'"'))
                console.log(data)
            },
        },
        // mounted() {
        //     this.getUserInfo("");
        // }
    }
</script>

<style scoped>

</style>