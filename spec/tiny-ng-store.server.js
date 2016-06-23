var spawn = require('child_process').spawn;
var http = require('http');
var pass = false
var server = http.createServer(function (req, res) {
    var status = parseInt(req.url.replace('/', ''));
    if (status >= 0) {
        status === 0 ? pass = true : pass = false;
    }
    res.writeHead(200, 
        { 'Content-Type': 'text/plain'
        , 'Access-Control-Allow-Origin': '*'
        , 'Access-Control-Allow-Headers': 'X-Requested-With'
        }
    );
    res.end();
}).listen(3001);

var npm = (process.platform === "win32" ? "npm.cmd" : "npm");
var liveServer = spawn(npm, ['run', 'server-test'], {detached: true})
liveServer.on('SIGTERM', function() {
    console.log('closing');
    process.exit(pass ? 0 : 1);
});

setTimeout(function() {
    if (process.platform === "win32") {
        spawn("taskkill", ["/pid", liveServer.pid, '/f', '/t'])
            .on('close', function() {
                console.log('exit code: ', pass ? '0' : '1');
                process.exit(pass ? 0 : 1);
            });
    } else {
        process.kill(-liveServer.pid, 'SIGTERM');
    }
}, 20000);