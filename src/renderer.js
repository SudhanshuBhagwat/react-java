import { JReconciler, setAppInstance } from "./reconciler";
import path from "path";
import { appendClasspath, importClass, ensureJvm } from "java-bridge";
import { spawn } from "node:child_process";

const TARGET_FPS = 60;

export default async function render(reactEl) {
  ensureJvm();
  const jarFilePath = path.join(__dirname, "..", "bin", "react-java-1.0-SNAPSHOT.jar");
  // appendClasspath(path.join(__dirname, "..", "bin", "react-java-1.0-SNAPSHOT.jar"))

  try {
    // const App = importClass("com.bhagwat.App");
    // const AppInstance = await App.newInstanceAsync();
    // await AppInstance.init("Hello from React");
    // setAppInstance(AppInstance);
    // AppInstance.run();
    const java = spawn("java", ["-jar", jarFilePath]);

    java.stdout.on("data", (data) => {
      try {
        const parsedData = JSON.parse(data);
        switch(parsedData.type) {
          case "WINDOW_CLOSED":
            process.exit(0);
          default:
            break;
        }
      } catch (err) {
      }
    })

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
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}
