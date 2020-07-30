import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes/routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;

console.log(`Listening on ${port}`);

await app.listen({port: port});