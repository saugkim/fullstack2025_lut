```
Atlas atlas-5c1085-shard-0 [primary] test> use blog
switched to db blog
Atlas atlas-5c1085-shard-0 [primary] blog> show dbs
blog                        56.00 KiB
sample_mflix               105.61 MiB
admin                      360.00 KiB
local                        9.97 GiB
Atlas atlas-5c1085-shard-0 [primary] blog> db.createCollection("posts")
{ ok: 1 }
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.insertOne({ title: "post2", body:"body of post2", category:"News", likes: 1, date:Date(), tags: ["news","events"] })
{
  acknowledged: true,
  insertedId: ObjectId('689f7357fb86ea08a5eec4a9')
}

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.insertMany([{title: "post3", body:"body of post3", category:"News", likes: 3, date:Date(), tags: ["news","events"]},{ title: "post4", body:"body of post4", category:"News", likes: 4, date:Date(), tags: ["news","events"]},{ title: "post5", body:"body of post5", category:"News", likes: 5, date:Date(), tags: ["news","events"] },{ title: "post6", body:"body of post6", category:"News", likes: 6, date:Date(), tags: ["news","events"] }])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('689f7ad5fb86ea08a5eec4aa'),
    '1': ObjectId('689f7ad5fb86ea08a5eec4ab'),
    '2': ObjectId('689f7ad5fb86ea08a5eec4ac'),
    '3': ObjectId('689f7ad5fb86ea08a5eec4ad')
  }
}


Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find({category: "news"})
[
  {
    _id: ObjectId('689de945a595b6396ceec4a9'),
    title: 'post1',
    body: 'body of post1',
    category: 'news',
    likes: 1,
    date: 'Thu Aug 14 2025 16:48:53 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  }
]

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find().sort({title:-1})
[
  {
    _id: ObjectId('689f7ad5fb86ea08a5eec4ad'),
    title: 'post6',
    body: 'body of post6',
    category: 'News',
    likes: 6,
    date: 'Fri Aug 15 2025 21:22:13 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689f7ad5fb86ea08a5eec4ac'),
    title: 'post5',
    body: 'body of post5',
    category: 'News',
    likes: 5,
    date: 'Fri Aug 15 2025 21:22:13 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689f7ad5fb86ea08a5eec4ab'),
    title: 'post4',
    body: 'body of post4',
    category: 'News',
    likes: 4,
    date: 'Fri Aug 15 2025 21:22:13 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689f7ad5fb86ea08a5eec4aa'),
    title: 'post3',
    body: 'body of post3',
    category: 'News',
    likes: 3,
    date: 'Fri Aug 15 2025 21:22:13 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689f7357fb86ea08a5eec4a9'),
    title: 'post2',
    body: 'body of post2',
    category: 'News',
    likes: 1,
    date: 'Fri Aug 15 2025 20:50:15 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689de945a595b6396ceec4a9'),
    title: 'post1',
    body: 'body of post1',
    category: 'news',
    likes: 1,
    date: 'Thu Aug 14 2025 16:48:53 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  }
]

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find({category: "News"}).count()
5
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find().limit(2)
[
  {
    _id: ObjectId('689de945a595b6396ceec4a9'),
    title: 'post1',
    body: 'body of post1',
    category: 'news',
    likes: 1,
    date: 'Thu Aug 14 2025 16:48:53 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  },
  {
    _id: ObjectId('689f7357fb86ea08a5eec4a9'),
    title: 'post2',
    body: 'body of post2',
    category: 'News',
    likes: 1,
    date: 'Fri Aug 15 2025 20:50:15 GMT+0300 (Eastern European Summer Time)',
    tags: [ 'news', 'events' ]
  }
]

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.findOne()
## find first item

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.findOne({likes: {$gt: 3}})
{
  _id: ObjectId('689f7ad5fb86ea08a5eec4ab'),
  title: 'post4',
  body: 'body of post4',
  category: 'News',
  likes: 4,
  date: 'Fri Aug 15 2025 21:22:13 GMT+0300 (Eastern European Summer Time)',
  tags: [ 'news', 'events' ]
}

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.updateOne({title: "post1"}, {$set: {category: "tech"}})
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.updateOne({title: "post1"}, {$set: {likes:15}})  
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.updateOne({title: "post 9"}, {$set: {title: "post 9", body: "body of post9", likes: 9 }}, {upsert: true})
## update and insert if not exists
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.updateMany({}, {$inc: {likes: 2}})

Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find().count()
7
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.deleteOne({title: "post3"})
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find().count()
6
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.deleteMany({category: "tech"})
Atlas atlas-5c1085-shard-0 [primary] blog> db.posts.find().count()
5

```






