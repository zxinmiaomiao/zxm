# 版本控制
控制软件版本的工具
主流的2种版本控制软件 git svn
现代编辑器(文本编辑器 IDE编辑器)中  都会集成版本控制工具

# git
git是一个跨平台(操作系统windows linux unix osx)的版本控制工具
git是一个开源(开放源代码)的 分布式 版本控制系统 有效高速的去管理各种大型小型项目的源代码
Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

### github
https://github.com
git 和 github 没有关系
github 是全球最大的IT开源社区(编程式交友) 
github 提供了一些服务 免费(public)的git仓库

2018年10月 微软收购了github 干掉开源(私有仓库免费)

开源大法好


集成终端 Ctrl+`

### git
初始化仓库
在项目根目录执行
```
$ git init
```

用户设置  每台电脑只需要执行一次
```
$ git config --global uscder.name "zhangxinmiao"
$ git config --global user.email "zhangsan@163.com"
```

在git管理的项目中 根目录下必须有一个README.md文件
README.md是项目说明文件

添加文件管理
``` 
$ git add filename  添加单个文件
$ git add path/     添加目录
$ git add .         添加所有文件/目录
```

状态查看
```
$ git status
```

将代码 提交到本地仓库
```
git commit -m 'first'
```

查看提交日志
```
$ git log
```

恢复到某个版本
```
$ git reset --hard hash(前6位)
```


将本地仓库推送到远程仓库
```
$ git remote add origin https://github.com/jxsrzj/app.git
$ git push -u origin master
```

克隆仓库
```
git clone 仓库地址
```



### 设置忽略列表
在项目的根目录创建 
.gitignore 文件
文件中的每一行代表需要忽略的一个文件 或 目录

### 分支操作
当git仓库初始化的时候 会自动创建一个新的分支 这个分支叫做主分支(master)


新建分支
```
$ git branch 分支名   创建分支
$ git branch         查看分支
```

切换分支
```
$ git checkout 分支名  切换分支
```


合并分支
```
$ git merge 分支名    合并分支
```