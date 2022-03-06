const child_process = require("child_process");
exports.copy = (data) => {
  return new Promise((resolve, reject) => {
    // check which platform is running
    if (process.platform === "win32") {
      // create a new child process
      const child = child_process.spawn("clip");
      // write the data to the child process
      child.stdin.write(data);
      // close the child process
      child.stdin.end();
    } else if (process.platform === "darwin") {
      // create a new child process
      const child = child_process.spawn("pbcopy");
      // write the data to the child process
      child.stdin.write(data);
      // close the child process
      child.stdin.end();
    } else {
      reject(new Error("Platform not supported"));
    }
    // resolve the promise
    resolve();
  });
};
