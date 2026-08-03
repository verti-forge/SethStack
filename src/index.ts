import { runAll } from "./pipeline";

const cmd = process.argv[2] ?? "all";
if (["all","validate","graph","report"].includes(cmd)) {
  runAll();
} else {
  runAll();
}
