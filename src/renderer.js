const SYS_INFO = document.getElementById("sysinfo");

setInterval(UpdateStats, 1000);

async function UpdateStats() {
  const config = await api.getEnabledProps();
  console.log(config);
  let currentStats = "";
  if (config && config.CPU) {
    const cpuUsage = await api.getCurrentLoad();
    const cpuUsed = cpuUsage.currentLoad;
    console.log(cpuUsed.toFixed(1));
    currentStats += `CPU: ${cpuUsed.toFixed(1)}%\n`;
  }
  if (config && config.CPUTemp) {
    const cpuTemp = await api.getCpuTemperature();
    currentStats += `CPU Temp: ${cpuTemp.main}\n`;
  }
  if (config && config.UsedRam) {
    const usedRam = await api.getUsedRam();
    currentStats += `Used RAM: ${((100 * usedRam.used) / usedRam.total).toFixed(
      0
    )}%\n`;
  }
  if (config && config.Uptime) {
    const uptime = await api.getUptime();
    currentStats += `Uptime: ${uptime} hrs\n`;
  }
  if (config && config.Nvidia.Temp) {
    //todo if any true
    const graphics = await api.getGraphics();
    console.log(graphics);
    if (config.Nvidia.Temp)
      currentStats += `GPU Temp: ${graphics.controllers[1].temperatureGpu}\n`;
    if (config.Nvidia.GPUMemUsed)
      currentStats += `GPU Memory Used: ${(
        (100 * graphics.controllers[1].memoryUsed) /
        graphics.controllers[1].memoryTotal
      ).toFixed(0)}%\n`;
    if (config.Nvidia.PowerDraw)
      currentStats += `GPU Power Draw: ${graphics.controllers[1].powerDraw.toFixed(
        0
      )}\n`;
  }
  SYS_INFO.innerText = currentStats;
  SYS_INFO.style.textAlign = "left";

  SYS_INFO.style.backgroundColor = config.Background.Color
    ? config.Background.Color
    : "transparent";
  //SYS_INFO.style.backgroundColor = config.Background.Shape ? config.background.Shape : "rectangle";

  SYS_INFO.style.textShadow = config.Font.ShadowColor
    ? `2px 2px 5px ${config.Font.ShadowColor}`
    : "2px 2px 5px red";
  SYS_INFO.style.color = config.Font.Color ? config.Font.Color : "yellow";
  SYS_INFO.style.fontSize = config.Font.Size ? `${config.Font.Size}px` : "20px";
  SYS_INFO.style.fontFamily = config.Font.Style ? config.Font.Style : "courier";
}
