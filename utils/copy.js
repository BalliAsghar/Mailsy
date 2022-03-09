import child_process from "child_process";

const copy = (data) => {
  return new Promise((resolve, reject) => {
    // check which platform is running
    const platform = process.platform;

    // if the platform is win32 or darwin then run the code
    if (platform === "win32" || platform === "darwin") {
      // create a new child process
      const child = child_process.spawn(
        platform === "win32" ? "clip" : "pbcopy"
      );
      // write the data to the child process
      child.stdin.write(data);
      // close the child process
      child.stdin.end();
    }

    // resolve the promise
    resolve();

    // reject the promise
    reject(new Error("Platform not supported"));
  });
};

export default copy;
