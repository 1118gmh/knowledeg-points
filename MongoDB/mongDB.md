### nodejs操作mongDB数据库

```
/**
* 数据库操作
*/
//引入mongodb模块
const { MongoClient } = require("mongodb");
//连接数据库 (要输入对应用户名、密码、以及连接的哪个数据库)
const uri = "mongodb+srv://gaominghui:<password>@cluster0.fp8ji.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//等待连接成功，连接成功后就可以对数据库进行操作了！
//await client.connect();
//console.log("Connected correctly to server");

//创建数据库   若sample_airbnb存在，则获取这个数据库，若不存在，则自动创建
// const db = client.db('sample_airbnb');
//获取sample_airbnb数据库中的listingsAndReviews集合
// const listingsAndReviews = db.collection('listingsAndReviews');

//例：创建collage数据库，student集合，两步得一起
// const db = client.db('collage');
// const student = await db.createCollection("student");
// const teacher = await db.createCollection("teacher");
//获取所有集合
// let listCollections = await db.listCollections().toArray();
// console.log(listCollections);

/**
* 集合操作
*/
// 插入 insertOne insertMany
// await listingsAndReviews.insertOne({
//   "name":"gmh"
// });
// await listingsAndReviews.insertMany([
//   {
//     "name":"hhh1"
//   },
//   {
//     "name":"hhh2"
//   }
// ]);

//查询 find fineOne
// let res = await listingsAndReviews.find({}).toArray(); //查集合中的所有文档
// let res = await listingsAndReviews.findOne({name:"gmh"}).toArray(); //根据条件查询文档
// console.log(res);

//更新 updateOne updateMany
// await listingsAndReviews.updateOne({"name":"gmh"},{"name":"hhh"});

//删除 deleteOne deleteMany
// await listingsAndReviews.deleteOne({"name":"gmh"});
// await listingsAndReviews.deleteMany({});


//...
//更多参考mongoDB API
//http://mongodb.github.io/node-mongodb-native/3.6/api/index.html
```

