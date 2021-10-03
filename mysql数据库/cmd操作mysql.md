## cmd操作mysql 

登录

```
mysql -uroot -p******
```

数据库操作

```
查看数据库
show databases;

创建数据库
create database db_name;

使用数据库
use databases;

删除数据库
drop database db_name;=
```

创建表

```\
　　1、创建表：

　　　　>CREATE TABLE table_name(

　　　　>id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,　　　　//id值，无符号、非空、递增——唯一性，可做主键。

　　　　>name VARCHAR(60) NOT NULL

　　　　>score TINYINT UNSIGNED NOT NULL DEFAULT 0,　　　　//设置默认列值

　　　　>PRIMARY KEY(id)

　　　　>)ENGINE=InnoDB　　　　//设置表的存储引擎，一般常用InnoDB和MyISAM；InnoDB可靠，支持事务；MyISAM高效不支持全文检索

　　　　>DEFAULT charset=utf8;　　//设置默认的编码，防止数据库中文乱码

　　　　如果有条件的创建数据表还可以使用   >CREATE TABLE IF NOT EXISTS tb_name(........

　　2、复制表：

　　　　>CREATE TABLE tb_name2 SELECT * FROM tb_name;

　　　　或者部分复制：

　　　　>CREATE TABLE tb_name2 SELECT id,name FROM tb_name;

　　3、创建临时表：

　　　　>CREATE TEMPORARY TABLE tb_name(这里和创建普通表一样);

　　4、查看数据库中可用的表：

　　　　>SHOW TABLES;

　　5、查看表的结构：

　　　　>DESCRIBE tb_name;

　　　　也可以使用：

　　　　>SHOW COLUMNS in tb_name; 　　　　//from也可以

　　6、删除表：

　　　　>DROP [ TEMPORARY ] TABLE [ IF EXISTS ] tb_name[ ,tb_name2.......];

　　　　实例：

　　　　>DROP TABLE IF EXISTS tb_name;

　　7、表重命名：

　　　　>RENAME TABLE name_old TO name_new;

　　　　还可以使用：

　　　　>ALTER TABLE name_old RENAME name_new;
```

修改表

```
　　1、更改表结构：

　　　　>ALTER TABLE tb_name ADD[CHANGE,RENAME,DROP] ...要更改的内容...

　　　　实例：

　　　　>ALTER TABLE tb_name ADD COLUMN address varchar(80) NOT NULL;

　　　　>ALTER TABLE tb_name DROP address;

　　　　>ALTER TABLE tb_name CHANGE score score SMALLINT(4) NOT NULL;
```

插入数据

```
　　1、插入数据：

　　　　>INSERT INTO tb_name(id,name,score)VALUES(NULL,'张三',140),(NULL,'张四',178),(NULL,'张五',134);

　　　　这里的插入多条数据直接在后边加上逗号，直接写入插入的数据即可；主键id是自增的列，可以不用写。

　　2、插入检索出来的数据：

　　　　>INSERT INTO tb_name(name,score) SELECT name,score FROM tb_name2;
```

更新数据

```
　　1、指定更新数据：

　　　　>UPDATE tb_name SET score=189 WHERE id=2;

　　　　>UPDATE tablename SET columnName=NewValue [ WHERE condition ]
```

删除数据

```
　　1、删除数据：

　　　　>DELETE FROM tb_name WHERE id=3;
```

条件控制

```
　　1、WHERE 语句：

　　　　>SELECT * FROM tb_name WHERE id=3;

　　2、HAVING 语句：

　　　　>SELECT * FROM tb_name GROUP BY score HAVING count(*)>2

　　3、相关条件控制符： 

　　　　=、>、<、<>、IN(1,2,3......)、BETWEEN a AND b、NOT

　　　　AND 、OR

　　　　Linke()用法中      %  为匹配任意、  _  匹配一个字符（可以是汉字）

　　　　IS NULL 空值检测
```

mysql正则

```
　　1、Mysql支持REGEXP的正则表达式：

　　　　>SELECT * FROM tb_name WHERE name REGEXP '^[A-D]'   //找出以A-D 为开头的name

　　2、特殊字符需要转义。
```

分组查询

```
 　　1、分组查询可以按照指定的列进行分组：

　　　　>SELECT COUNT(*) FROM tb_name GROUP BY score HAVING COUNT(*)>1;

　　2、条件使用Having；

　　3、ORDER BY 排序：

　　　　ORDER BY DESC|ASC　　　　=>按数据的降序和升序排列
```



查看



查看编码

查看数据库端口

```
show variables  like 'port';
```



