const API = {
    GET_QUESTION: {
        // 向后端获取新的题目
        path: "/backend/mission",
        method: "GET"
    },
    POST_SINGLE_QUESTION: {
        // 用户填写答案后向后端发送数据
        path: "/backend/mission",
        method: "POST"
    },
    POST_NEW_MISSION: {
        // 向后端发送用户编写的题型
        path: "/backend/upload",
        method: "POST"
    }
};

export default API;
