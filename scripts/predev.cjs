const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

// Free port 3000
try {
  const out = execSync('netstat -ano | findstr ":3000" | findstr "LISTENING"', {
    encoding: "utf8",
  });
  const pids = new Set();
  for (const line of out.trim().split("\n")) {
    const pid = line.trim().split(/\s+/).pop();
    if (pid && pid !== "0") pids.add(pid);
  }
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`Freed port 3000 (stopped PID ${pid})`);
    } catch {
      /* already gone */
    }
  }
} catch {
  /* port already free */
}

// Clear .next (OneDrive often locks stale cache → EPERM / stuck compile)
const nextDir = path.join(__dirname, "..", ".next");
if (fs.existsSync(nextDir)) {
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true });
      console.log("Cleared .next cache");
      break;
    } catch (err) {
      if (i === 4) {
        console.warn("Could not fully clear .next:", err.message);
        console.warn("Close other terminals running npm run dev, then try again.");
      } else {
        sleep(800);
      }
    }
  }
}
