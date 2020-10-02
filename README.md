# absanno

a web application for the release, management and completion of data annotation tasks

#### 下载项目

先进行配置：

`git config --global user.name "中文姓名"`

`git config --global user.email "学号@secoder.net"`

然后进行下载：

`git clone https://gitlab.secoder.net/abstract/ABSanno-frontend.git`

#### 访问后端数据

后端 url 都是以 `https://absanno-abstract.app.secoder.net/absanno/` 开头，建议大家模仿小作业写一个 API 对象，不要将 url 和请求方式写死在代码里。另外，配置文件中已经设置了代理，大家在访问时可以不用输入完整的 url，而是输入**相对于 `/backend` 的 url**。例如，大家请求 `https://absanno-abstract.app.secoder.net/absanno/data/` 的数据时，也可以用：`/backend/data/`。
另外，**请求的 URL 最后必须加斜杠！**（否则代理会出 bug，目前还没有 fix 掉）

```python
# nginx/frontend.conf
location / {
}

location /backend {
    proxy_pass https://absanno-abstract.app.secoder.net/absanno;
}
```

#### 更新远程代码

`git push`

### 前端的使用

以templates为根目录打开整个项目。

- Project setup

```
npm install
```

- Compiles and hot-reloads for development

```
npm run serve
```

- Compiles and minifies for production

```
npm run build
```

- Lints and fixes files

```
npm run lint
```


## 第一阶段

- 前端
  - 人员：ljj，xyq，zyz
  - 说明：实现正常页面逻辑跳转，将后端数据正确显示到屏幕，不需要美化/优化，功能、布局大致正确即可；第二阶段再参照模版实现美化

- 后端
  - 人员：scy，wjw

- 主要任务
  - 正确登陆&注册
    - 前端制作窗口
    - 前端设置cookie（？）
    - 后端进行加密/解密算法
    - 后端核对是否正确登陆，或者注册新用户的信息
    - 后端配备相应个人数据库，储存个人信息

  - 网站规则
    - 前端撰写网站规则1.0，说明vip的注册&积分规则etc

  - 导航栏
    - 前端实现页面跳转逻辑

  - 题目广场
    - 题组广场，题目暂定仿照百度平台，一组题一组题地显示，或者按照tag分类，一类一类展示
    - 后端设计数据库，每次调用接口提供固定数量（如20个）的json array
    - 前端解析json，展示的题目+分类+积分准则，点击对应的题目可以跳转

  - 个人页面
    - 后端提供对应数据，包括头像，信用积分，历史记录等
    - 前端设计页面，展示这些信息，注意历史记录可能需要局部翻页，每次翻页从后端请求

  - 管理员页面
    - 这个比较麻烦，初始版本别要了

  - 发题页面
    - 先只支持判断题，可以判断图片/文字是否满足某个标签
    - 前端提供图片/文字类型的选择，上传图片会弹出本地上传文件的框
    - 前端支持用户输入标签名，tag名等
    - 后端接受前端数据，加入数据库
    - 后端扣除用户的金币值

  - 做题页面（先只支持判断题）
    - 先只支持判断题，可以判断图片/文字是否满足某个标签
    - 可以考虑所有题放到一个页面中（类似于问卷），或者每次展示1题，点击next翻页
    - 前端传递题组编号，向后端发送请求
    - 后端根据前端的请求发送题目数据，将题组顺序打乱发送，同时混入部分已知答案的同种题目
    - 前端设计两种题目的展示页面模版
    - 前端解析后段传递的数据，填入模版
    - 后端接收前端收集的答题数据，放入数据库，更新用户信誉积分及金币值

### 后端

- 用户信息的管理（一类，包括需求方的题库和信息管理，标注者的信息管理，各种属性）
- 用户注册、登陆是否成功
- 题目分发算法
- 用户完成标注后，答案的整合方法
- 检查算法/信誉程度（做题时间/抽查题目）
- 题目和结果的导出接口
- 用户画像（用于题目分发，用户可以选择）


- 主要数据库
  - 用户信息数据库
  - 大任务数据库（对应广场）
  - 每个用户两个小数据库（只记录id）

### 前端

- 登录&注册界面
- 广场/列表页面（显示已发布任务）
- 网站规则页面
- 个人主页
  - 个人画像/头像/信誉积分/金币/历史做题记录
- 标注者做题页面
- 需求方界面/发题页面
  - 任务管理界面（可以进入任务配置模块、任务分发模块、发布任务、查看已申请的标注者数量、导出）
  - 任务配置模块（包括题目的上传）
  - 任务分发模块（可以看到申请答题的用户列表，进行分发）
  - 验收模块（对每道题按质量评分）
- 管理员界面
  - 用户名单列表
- 导航栏（点击头像可以退出）


### 隐藏玩法

- 登陆奖励/观看广告奖励
- 新手任务/教学标注演示
- 用户信誉给答案加权
- 信封通信
- 题目发布批量上传
- 收集数据集，给奖励（比如可以上传对应标签的图片，放入公开数据集里）
- 题目发布支持预览
- 支持上传者给定几个样本或标准答案，用于检测做题者的认真程度