## git分支管理（工作中的使用）

假设目前只有一个分支master。

```
git clone master branch   # 克隆下来
```

新建本地的开发分支

```
git checkout -b local     # 创建并切换到local分支
```

在local分支上开发和测试，改代码，正常提交代码（git commit）提交到local分支上了

阶段性开发完成后，准备提交代码到码云

```
git checkout master       # 切换到master分支
git pull                  # 拉取最新状态

git checkout local        # 切换到local分支
git rebase -i HEAD~2      # 将多次提交合并为一个，简化提交历史（这样可以在合并分支的时候，只需解决一个冲突即可）（HEAD~2 表示合并2个）
git rebase master -> 解决冲突 -> git rebase --continue   # 将master最新的分支同步到本地，需要手动解决冲突，解决冲突后，通过continue合并冲突

git checkout master       # 切换到master分支
git merge local           # 合并分支
git push			      # 提交master分支代码到远程仓库的master分支下   
```

将本地的local分支，推送到码云的local分支

```
git checkout local
git push -u origin local
```









合并提交

```
变基时有六个命令可用：
pick
pick只是意味着包括提交。重新进行命令时，重新安排pick命令的顺序会更改提交的顺序。如果选择不包括提交，则应删除整行。

reword
该reword命令与相似pick，但是使用后，重新设置过程将暂停并为您提供更改提交消息的机会。提交所做的任何更改均不受影响。

edit
如果您选择edit提交，则将有机会修改提交，这意味着您可以完全添加或更改提交。您还可以进行更多提交，然后再继续进行变基。这使您可以将大型提交拆分为较小的提交，或者删除在提交中所做的错误更改。

squash
该命令使您可以将两个或多个提交合并为一个提交。提交被压缩到其上方的提交中。Git使您有机会编写描述这两个更改的新提交消息。

fixup
这类似于squash，但是要合并的提交已丢弃其消息。提交仅合并到其上方的提交中，并且较早提交的消息用于描述这两个更改。
```

git rebase -i HEAD~2  或者commit id：git rebase -i 0bb85c 582db9

然后输入i进入vim区，修改文件属性，将pick改成s

输入:wq命令退出，会进入下一个vim

输入i，修改提交的备注

输入:wq退出，即可合并完成



遇到冲突时：

```
git rebase --abort 放弃合并
git rebase --skip  会将引起冲突的commit丢掉
git rebase --continue 合并冲突
```

