<template>
    <div style="padding:20px 80px 20px 80px;">
        <h2 style="text-align: center;">规则说明</h2>

        <a-tree>
            <!--            <a-icon slot="switcherIcon" type="down" />-->
            <a-tree-node key="0-0" title="对于做题者" style="font-size: 16px">
                <a-tree-node key="0-0-0" title="你的义务" style="font-size: 14px">
                    <a-tree-node key="0-0-0-0" title="你应该仔细阅读每个题的介绍、问题和选项，并且给出你认可的答案。" />
                    <a-tree-node key="0-0-0-1" title="你不应该对本网站以及对应后端进行任何形式、任何程度的攻击。" />
                    <a-tree-node key="0-0-0-2" title="如果我们的反作弊机制发现你有过多的作弊行为或者不认真答题的行为，我们有权对你的账号进行封禁。" />
                </a-tree-node>
                <a-tree-node key="0-0-1" title="你的权利" style="font-size: 14px">
                    <a-tree-node key="0-0-1-0" title="你可以通过积累金币或者充值金币来申请成为发题者。" />
                    <a-tree-node key="0-0-1-1" title="你可以在广场上自由答题；如果答案符合我们的先验答案，你会获得奖励，并且在之后的答题过程中有更高的可信度。" />
                    <a-tree-node key="0-0-1-2" title="你可以正常使用所有普通用户的功能，包括但不限于：题目搜索，兴趣列表，查看答题历史，修改个人信息及密码。" />
                </a-tree-node>
            </a-tree-node>
            <a-tree-node key="0-1" title="对于发题者" style="font-size: 16px">
                <a-tree-node key="0-1-0" title="你的义务" style="font-size: 14px">
                    <a-tree-node key="0-1-0-0" title="你应该尽可能完整地填写发布的题目各种内容，包括但不限于：题目、介绍、先验答案、题目标签。" />
                    <a-tree-node key="0-1-0-1" title="你不应该对本网站以及对应后端进行任何形式、任何程度的攻击。" />
                    <a-tree-node key="0-1-0-2" title="你不能在任何程度上违反中国的相关法律法规。如果有，我们有权对你的账号进行封禁。" />
                </a-tree-node>
                <a-tree-node key="0-1-1" title="你的权利" style="font-size: 14px">
                    <a-tree-node key="0-1-1-0" title="你可以在相应页面发布符合规定的题目，并且给那些正确答题的用户支付报酬。" />
                    <a-tree-node key="0-1-1-1" title="你可以随时查看题目的结果，并且下载对应的结果文件。" />
                    <a-tree-node key="0-1-1-2" title="你可以选择忽略某些用户的作答。" />
                </a-tree-node>
            </a-tree-node>
            <a-tree-node key="0-2" title="奖励金币、信誉度说明" style="font-size: 16px">
                <a-tree-node key="0-2-0" title="你的信誉" style="font-size: 14px">
                    <a-tree-node key="0-2-0-0" title="初始用户的信誉度为50。" />
                    <a-tree-node key="0-2-0-1" title="你可以通过答题来增加你的信誉度（前提是，你成功答对了我们在每套题中有预埋答案的题目）。" />
                    <a-tree-node key="0-2-0-2" title="当然，你的信誉度也有可能会被扣除——如果你答错了许多简单的、有预埋答案的题目的话。" />
                    <a-tree-node key="0-2-0-3" title="你的信誉度影响到你的回答在我们系统中的占比：如果占比高，那么你的答案就更有可能发挥价值。" />
                </a-tree-node>
                <a-tree-node key="0-2-1" title="你的金币" style="font-size: 14px">
                    <a-tree-node key="0-2-1-0" title="你可以通过正确答题来增加你的金币。" />
                    <a-tree-node key="0-2-1-1" title="你可以通过申请成为发布者、发送题目来消耗你的金币。" />
                    <a-tree-node key="0-2-1-2" title="发送题目时，消耗金币=目标作答数*每个用户奖励数。" />
                    <a-tree-node key="0-2-1-3" title="申请成为发布者消耗500金币。" />
                </a-tree-node>
            </a-tree-node>
        </a-tree>
    </div>

</template>

<script>
    export default {
        name: "rules",
    }
</script>


<style scoped>

</style>