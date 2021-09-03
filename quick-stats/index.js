// Simple module to get the uptime of a Node app and its Resident Set Size in memory

function format(seconds) {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const sec = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(sec);
}

function uptime() {
  const uptime = process.uptime();
  return `Uptime: ${format(uptime)}.`;
}

function memUse() {
  const used = Math.floor(process.memoryUsage().rss / 1024 / 1024);
  return `Memory usage: ${used} MB.`;
}

function quickStats() {
  return `${uptime()} ${memUse()}`;
}

module.exports = quickStats;
