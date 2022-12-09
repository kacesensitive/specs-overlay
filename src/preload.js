const { contextBridge } = require("electron");
const { currentLoad } = require("systeminformation");
const si = require('systeminformation');
const fs = require('fs');

contextBridge.exposeInMainWorld("api", {
    getEnabledProps: () => JSON.parse(fs.readFileSync('./src/config.json').toString()),
    getCurrentLoad: () => currentLoad(),
    getCpuTemperature: () => si.cpuTemperature(),
    getUsedRam: () => si.mem(),
    getUptime: () => (si.time().uptime / 60 / 60).toFixed(0),
    getGraphics: () => si.graphics(),
})