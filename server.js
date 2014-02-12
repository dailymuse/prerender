var prerender = require('./lib')

var server = prerender.create({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    workerIterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    workerParallelism: process.env.PHANTOM_WORKER_PARALLELISM || 1,
    phantomArguments: ["--load-images=false", "--ignore-ssl-errors=true"],
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
