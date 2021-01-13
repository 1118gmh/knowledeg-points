### Git基础操作

1. git init

2. git clone

3. git add

   > 将文件提交到暂存区

   ``` js
   git add <filename> <filename> //提交对应文件到暂存区文件
   git add . //将所有文件提交到暂存区
   git add -A //将最新修改的文件提交到暂存区
   ```

4. git status

   > 查看上次提交后是否有修改

5. git diff

   > 查看执行git status的结果的详细信息

6. git commit

   > 将暂存区的内容提交到仓库

   ```js
   git commit -m"注释"
   ```

7. git reset HEAD

   > 取消已经缓存的内容

   ```js
   git reset HEAD <filename> //取消暂存区中的对应文件
   ```

8. git rm 

   > 如果只是从工作区中手动删除文件，运行git status就会有Changes not staged for commit 的提示。
   >
   > 但是要从仓库中移除某个文件，则使用
   >
   > ```js
   > git rm <filename>
   > ```
   >
   > 如果删除之前改过并且已经放到暂存区的话，则使用强制删除
   >
   > ```js
   > git rm -f <filename>
   > ```
   >
   > 如果把文件从暂存区中移除，但任希望保留在工作区中，则使用
   >
   > ```js
   > git rm --cached <filename>
   > ```
   >
   > 如果想要删除一个目录下的所有文件，则使用递归删除（在后面跟一个目录作为参数）
   >
   > ```js
   > git rm -r *
   > ```

9. git mv

   > 用于移动或重命名一个文件、目录、软连接。
   >
   > ```js
   > git mv <filename> <filename2>
   > ```