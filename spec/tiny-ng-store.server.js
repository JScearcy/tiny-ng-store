var spawn = require('child_process').spawn;
var npm = (process.platform === "win32" ? "npm.cmd" : "npm");
var liveServer = spawn(npm, ['run', 'test'], {detached: true});

setTimeout(function() {
    spawn("taskkill", ["/pid", liveServer.pid, '/f', '/t']);
}, 30000);