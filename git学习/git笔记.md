**参考邦哥：**https://www.axihe.com/tools/git/home.html

[git](git)

[GIT和GITHUB](GIT和GITHUB)

[error及解决方案](出错及解决方案)

## git

> git是一个开源的分布式版本控制系统用于敏捷高效地处理任何大小项目。

1. 全局配置
   git config --global user.name 'xxx'
   git config --global user.email 'xxx.xx'

2. 创建仓库
   git init //会生成一个隐藏的.git文件夹 ，不能删

   rm -rf  .git//删除仓库

3. 查看当前文件状态
   git status      //红   工作区     ；绿      暂存区   ； 空      历史区

4. 提交文件到暂存区
   git add xxx      //把某一个文件或者文件夹提交到暂存区
   git add .         //把当前仓库中的所有最新修改的文件提交到缓存区
   git add -A      //把当前仓库中的所有最新修改的文件提交到缓存区

5. 把暂存区内容提交到历史区
   git commit -m'描述信息，本次信息的描述'

6. 重置以前版本
   git reset 版本ID --hard    //不保存所有变更
   	        --soft     //保留变更且内容出于staged
   	        --mixed   //

7. 查看历史版本信息
   git log


## GIT和GIT-HUB
git-hub官网：http://www.github.com

#### github是什么

一个网站（一个开源的源代码管理平台），用户注册后，可以在自己账户下创建仓库，用来管理项目的源代码（源代码是基于git传到仓库中的）

1. setting设置
2. 创建仓库
   new repository
   public 公共仓库作为开源的项目
   private 私有仓库作为内部团队的开发的项目

#### 把本地仓库信息提交到远程仓库

1. 建立本地仓库和远程仓库的链接
   git remote -v       //查看本地仓库和哪些远程仓库保持链接
   git remote add origin [git仓库地址]       //让本地仓库和远程仓库建立一个连接，origin是随便起的一个链接名（可以改成自己想要的）
   git remote rm origin      //删除链接

   git pull origin master    //提交之前最好先拉取
   git push origin master     //把本地代码提交到远程仓库（需要验证密码）

   git clone 远程仓库git地址 （别名，可以不设置，默认  仓库名）//克隆

#### 真实项目开发流程：
 	1. 组长和负责人先创建中央仓库
 	2. 小组成员基于git clone 把远程仓库几默认内容克隆岛本地一份
     （解决了3件事情：git init 、git remote add、git pull)
 	3. 每个组员写完自己的程序后，基于git add/git commit把本地信息不和远程仓库信息把持同步即可，（可能要处理冲突问题）

### 出错及解决方案

1. 

   向远程仓库push时报错：
   ! [rejected] master -> master (non-fast forward)
   解决：

   - git pull origin master --allow-unrelated-histories //把远程仓库和本地同步，消除差异

   - 重新add和commit相应文件

   - git push origin master

   - 此时就能够上传成功了

