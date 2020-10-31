<template>
    <div>
        <div class="components-input-demo-presuffix">
            <h3>你可以在此改变你的用户名（留空来保持不变）</h3>
            <a-input-group compact>
                <a-input ref="userNameInput" placeholder="User name" v-model="user_name">
                    <a-icon slot="prefix" type="user" />
                    <a-tooltip slot="suffix" title="You can change your username here">
                        <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                </a-input>
            </a-input-group>
            <br/>
        </div>
        <div>
            <h3>选择你喜欢的题目类型</h3>
            <div>
                <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                        Check all
                    </a-checkbox>
                </div>
                <br />
                <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onCheckListChange" />
            </div>
        </div>
        <div>
            <h3>选择你偏好的题目数量</h3>
            <a-select default-value="num1" style="width: 120px" @change="handleNumberChange">
                <a-select-option value="num1">
                    题目数量1
                </a-select-option>
                <a-select-option value="num2">
                    题目数量2
                </a-select-option>
                <a-select-option value="num3">
                    题目数量3
                </a-select-option>
                <a-select-option value="num4">
                    题目数量4
                </a-select-option>
            </a-select>
        </div>
        <div>
            <h3>是否提交？</h3>
            <a-button-group>
                <a-button @click="change(0)">Cancel</a-button>
                <a-button type="primary" @click="submitChange">
                    OK
                </a-button>
            </a-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit_info"
    }
</script>

<style scoped>

</style>