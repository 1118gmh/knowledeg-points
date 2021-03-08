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

`npm view xxx > xxx.version.txt`查看模块的历史版本

`npm install xxx@xxx`：把资源下载到当前目录下(@xxx指定版本号)

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

**注意点**

1. 在本地项目中基于npm/yarn安装第三方模块

```
第一步：在本地项目中创建一个"package.json"的文件
	作用：把当前项目所有依赖的第三方模块信息（包含：模块名称以及版本号信息）都记录下来；可以在这里配置一些可执行的命令脚本等
	基于yarn会默认 生成一个"配置清单"，知识信息没有手动创建的全面
	手动创建：npm init -y 或者 yarn init -y
	{
    "name": "httptest",  //=>模块名称
    "version": "1.0.0",  //=>版本号
    "description": "",   //=>模块的描述”“
    "main": "server.js", //=>当前模块的主入口文件
    "scripts": {         //=>可执行脚本
        "server": "node server.js"
    },
    "keywords": [],      
    "author": "",
    "license": "ISC",
    "dependencies": {     //=>生产依赖
        "mime": "^2.5.2",
        "qs": "^6.9.6"
    },
    "devDependencies":{}   //=>开发依赖
}

第二步：安装
	开发依赖：只有在项目开发阶段依赖的第三方模块
	生产依赖：项目部署实施的时候，也需要依赖的第三方模块
	[npm]
		npm install xxx --save 保存到配置清单的生产依赖中
		npm install xxx --save-dev 保存到开发依赖中
	[yarn]
		yarn add xxx 默认就是保存到生产依赖中
		yarn add xxx --dev /-D 保存到开发依赖中
第三部：部署的时候“跑环境”
	不要自己一个个的安装，只需要执行npm install 或者yarni install即可，npm会自己先检测目录中是否有package.json文件，如果有的或话，会按照文件中的配置清单依次安装

=>开发一个项目，我们生成一个配置清单"package.json"，当我们安装第三方模块使用的时候，把安装的模块信息记录到配置清单中，这样以后不管是团队协作开发还是项目部署上线，我们都没有必要把node_modules发文件发文件给别人，只需要把配置清单传递给其他人即可，其他人拿到配置清单后，按照清单中依赖项及版本号，重新安装即可（重新安装：即“跑环境”）
```

2. 安装在本地和全局的区别

```
【安装在全局的特点】
	1. 所有的项目都可以使用这个模块
		- 容易导致版本冲突
		- 安装在全局的模块，不能基于CommonJS规范调取使用（不能在JS中通过require调取使用）
	
【安装在本地的特点】
	1. 只能当前项目使用这个模块
		- 不能直接的使用命令行
		
为什么安装在全局下可以使用命令？
	npm root / -g 查看本地项目或者全局环境下，npm的安装目录
	安装在全局目录下的模块，但部分都会生成一个xxx.cmd的文件
    @ECHO off
    SETLOCAL
    CALL :find_dp0

    IF EXIST "%dp0%\node.exe" (
      SET "_prog=%dp0%\node.exe"
    ) ELSE (
      SET "_prog=node"
      SET PATHEXT=%PATHEXT:;.JS;=;%
    )

    "%_prog%"  "%dp0%\node_modules\yarn\bin\yarn.js" %*
    ENDLOCAL
    EXIT /b %errorlevel%
    :find_dp0
    SET dp0=%~dp0
    EXIT /b
能否既安装在本地，也可以使用命令操作？
	(1) 把模块安装在本地如果支持命令操作的（会在node_modules的bin中生成xxx.cmd的命令文件，只不过这个文件无法在全局下执行 => 不能直接用命令）
	(2) 在package.json的scripts中配置需要执行的命令脚本
		"scripts":{
			"gmh":"lessc -v" 属性名自己设置即可，属性值是需要执行的命令脚本，根据需要自己编写（可以配置很多命令的）
		}
	(3) npm run gmh / yarn gmh 这样的操作就可以把配置的脚本执行
		-> 首先到配置清单的scripts中查找
		-> 找到后把后面对应的属性值（执行脚本）执行
		-> 执行脚本的时候，回到本地node_modules中bin文件下查找，没有的话，再向npm安装的全局目录下查找
```

