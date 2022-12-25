// backend 的入口
import mongo from './mongo';
import httpServer from './server';

mongo.connect();

const port = process.env.PORT |  4001;
httpServer.listen({ port }, () => {
    console.log(`App listening on port ${port}!`);
});