# GIT使用规范

by zyz 

### 如有错误尽早指出



## DEV分支设置

```
$ git branch dev // 在本地创建新分支dev
$ git checkout dev // 在本地切换到dev分支
// 上述两条指令可以通过 git checkout -b dev 一条指令完成
// 在dev分支下
$ git push --set-upstream origin dev // 将本地dev分支推送到远程dev分支（本地dev和远程dev同步）
```

### 不要在dev上直接工作！不要在dev上直接工作！不要在dev上直接工作！



## 个人DEV分支设置

### 规范格式：所有的个人dev分支叫做dev-xxx（xxx表示你的名字缩写，例如zyz/xyq/ljj），每人只有一个dev-xxx分支！！！

```
$ git checkout -b dev-xxx
// 在dev-xxx分支下
$ git --set-upstream origin dev-xxx
```



## 工作流程（检验通过，合理）

完成上述建立分支并且和远程仓库连接。

首先确认：

### 本地应该有且仅有三个分支！

### 不应该也不能出现别人的分支。

```
$ git branch -a
（输出：
master
dev
dev-xxx）
```
<img src="C:\Users\matth\AppData\Roaming\Typora\typora-user-images\image-20201010024754062.png" alt="image-20201010024754062" style="zoom:50%;" />

### 每一次工作之前，必须走以下流程！

```
// 准备阶段：从dev拿到现在最新的dev分支内容，然后在此基础上进行开发。
$ git checkout dev // 
$ git pull
$ git checkout dev-xxx
$ git merge dev // 这里可能会弹窗让你写merge信息；这一段的目的是从dev拿到最新的内容，可					以这么写
$ git push // 这里如果出现提示set-upstream，照做，但是一定要将origin/<branch>中的					branch和你的当前分支，即dev同名

$ git checkout dev-xxx // 在自己的分支上开发！

// 进行你的工作

// 工作完成！把自己的工作推到dev-xxx分支上
$ git checkout dev-xxx // 在自己的分支上！
$ git add .
$ git commit -m "这是你的commit信息"
$ git push // 这里如果出现提示set-upstream，照做，但是一定要将origin/<branch>中的					branch和你的当前分支，即dev同名


// 收尾阶段：待你准备将dev-xxx分支下的内容merge进dev（merge进master同理）
$ git checkout dev
$ git pull
$ git merge dev-xxx // 同理，这里也可能出现让你写merge信息，这里是将检查过的代码放入dev						分支中，准备merge进master了
$ git push // 同理，这里如果出现提示set-upstream，照做，但是一定要将origin/<branch>中				的branch和你的当前分支，即dev同名
```


