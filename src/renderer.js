import { JReconciler, setEventBridge} from "./reconciler";
import path from "path";
import { spawn } from "node:child_process";
console.log(require.resolve("react"))

class EventBridge {
  constructor() {
    const jarFilePath = path.join(__dirname, "..", "bin", "react-jaylib-1.0-SNAPSHOT.jar");
    console.log(jarFilePath)

    try {
      this.java = spawn("java", ["-jar", jarFilePath]);

      this.java.stderr.on("data", (data) => {
        process.stderr.write("[java] " + data.toString());
      });

      this.java.stdout.on("data", (data) => {
        try {
          console.log(data.toString());
          const parsedData = JSON.parse(data);
          switch(parsedData.type) {
            case "WINDOW_CLOSED":
              process.exit(0);
            default:
              break;
          }
        } catch (err) {
          
        }
      });
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  }

  sendMessage(message) {
    this.java.stdin.write(message + "\n");
  }
}

export default async function render(reactEl) {
    const eventBridge = new EventBridge();
    setEventBridge(eventBridge);

    const container = { type: "ROOT" };
    const root = JReconciler.createContainer(
      container, 
      0,
      null,
      false,
      null,
      "",
      (err) => console.error("Recoverable error:", err),
      null
    );

    JReconciler.updateContainer(reactEl, root, null, () => {
      console.log("Render complete");
    });
}
