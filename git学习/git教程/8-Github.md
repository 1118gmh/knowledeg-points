### Github

> 目前我们使用到的 Git 命令都是在本地执行，如果你想通过 Git 分享你的代码或者与其他开发人员合作。 你就需要将数据放到一台其他开发人员能够连接的服务器上。
>
> 本例使用了 Github 作为远程仓库；

#### 查看当前远程库

> 查看当前配置哪些远程仓库

```js
$ git remote
$ git remote -v //可以看到每个别名的实际连接地址 
```

> 添加一个远程仓库（shortname远程仓库别名）

```
$ git remote add <shortname> <url>

$ git remote add origin git@github.com:tianqixin/axihe-git-test.git
```

#### 提取远程仓库

> 从远程仓库下载新分支与数据

```
$ git fetch <远程仓库别名>

$ git fetch orgin
```

> 执行完上命令后，需要合并到当前分支

```
$ git merge <分支名>

$ git merge orgin/master
```

#### 推送到远程仓库

> 推送你的新分支与数据到某个远程仓库

```
$ git push <远程仓库别名> <分支名>

$ git push origin master
```

#### 删除远程仓库

```
$ git remote rm <远程仓库别名>
```





