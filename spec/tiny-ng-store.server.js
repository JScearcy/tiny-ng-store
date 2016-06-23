var spawn = require('child_process').spawn;
var npm = (process.platform === "win32" ? "npm.cmd" : "npm");
var liveServer = spawn(npm, ['run', 'server-test'], {detached: true});

setTimeout(function() {
    if (process.platform === "win32") {
        spawn("taskkill", ["/pid", liveServer.pid, '/f', '/t']);
    } else {
        process.kill(-liveServer.pid, 'SIGTERM');
    }
}, 30000);