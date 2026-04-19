import { JReconciler } from "./reconciler";
import path from "path";
import { appendClasspath, importClass, ensureJvm } from "java-bridge";

const TARGET_FPS = 60;

export default async function render(reactEl) {
  ensureJvm();
  appendClasspath(path.join(__dirname, "..", "bin", "react-java-1.0-SNAPSHOT.jar"))

  try {
    const App = importClass("com.bhagwat.App");
    const AppInstance = await App.newInstanceAsync();
    await AppInstance.init("Hello from React");

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
