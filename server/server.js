const Koa = require('koa');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { ApolloServer } = require('apollo-server-koa');
const next = require('next');
const Router = require('koa-router');
const Mongo = require('koa-mongo');
const KoaBody = require('koa-body');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const app = next({ dev: true });
const handle = app.getRequestHandler();
const router = new Router();
const server = new Koa();
server.keys = ['koa'];

(async () => {
    try {
        await app.prepare();
        server.use(Mongo({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME
        }))
            .use(KoaBody({ multipart: true }))

        router.get('(.*)', async (ctx) => {
            if (!ctx.path.match(/graphql/)) {
                await handle(ctx.req, ctx.res);
                ctx.respond = false;
            }
        });

        const graphQLServer = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            playground: {
                endpoint: "/graphql"
            },
            bodyParser: true,
            context: ({ ctx }) => ctx
        });
        graphQLServer.applyMiddleware({ app: server });

        server.use(router.routes())
            .listen(process.env.PORT, () => {
                console.log(`server running at ${process.env.PORT}`);
            });
    } catch (e) {
        console.log(e);
        process.exit();
    }
})();