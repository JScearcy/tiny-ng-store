const spawn = require('child_process').spawn;
let npm = (process.platform === "win32" ? "npm.cmd" : "npm");
let liveServer = spawn(npm, ['run', 'server-test'], {detached: true});

setTimeout(function() {
    spawn("taskkill", ["/pid", liveServer.pid, '/f', '/t']);
}, 30000);