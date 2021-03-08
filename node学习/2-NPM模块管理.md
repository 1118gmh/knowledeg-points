### NPM模块管理

> 安装node后，自带npm模块管理器
>
> 我们需要一个第三方模块、插件、类库或者框架等，需要提前下载安装才可以使用
>
> - 百度搜索，找到下载地址，基于浏览器下载（资源混乱，不方便搜索）
>
> - 基于npm等第三方包管理器下载（yarn / bower ....都是第三方模块）
>
>   （npm是基于https://www.npmjs.com/下载资源的）

**常用命令：**

`npm install xxx`：把资源下载到当前目录下

`npm install xxx -g(--global)`:把资源或者第三方模块安装到的全局环境下（目的：以后可以基于一些命令来操作一些事情）

`npm uninstall xxx  / npm uninstall xxx -g`：从本地或者全局卸载

`npm addUser`登录npm （登录时要先切源到npm）

`npm publish`上传包文件

> 基于npm安装的特点：
>
> - 连网(国外服务器，下载慢)
> - 下载成功后，在node_modules文件夹，在这个文件夹中找到我们需要的模块
> - 一般来说，下载下来的内容包含源码和最后提供开发者使用的压缩版本

**解决下载慢的问题：**

- 基于nrm切换到国内下载资源（一般是淘宝镜像）（切源）

  > 首先在全局安装nrm模块：npm install nrm -g
  >
  > 安装完成后，可以使用nrm命令
  >
  > nrm ls 查看当前可用源
  >
  > nrm use xxx 使用某个源
  >
  > **切完源还是得基于npm安装操作**

- 可以基于yarn来安装管理

  > 首先在全局安装yarn模块：npm install yarn -g 
  >
  > 安装完成后，可以使用yarn命令安装我们需要的模块，基于yarn安装的东西只能安装在本地
  >
  > yarn add xxx 
  >
  > yarn remove xxx

- 可以基于cnpm淘宝镜像处理

**解决安装版本的问题**

> 首先查看当前模块的历史版本：`npm view jquery > jquery.version.json`：把当前模块的历史信息输出到具体的某个文件中（文件名自己随便起的）
>
> 安装指定的版本模块：`yarn add jquery@1.11.3`：npm和yarn都是这样来安装指定版本的

