import { appendClasspath, importClass, ensureJvm } from "java-bridge";
import path from "path";

async function run() {
  ensureJvm();
  appendClasspath(path.join(__dirname, "..", "bin", "react-java-1.0-SNAPSHOT.jar"))

  try {
    const App = importClass("com.bhagwat.App");
    const AppInstance = await App.newInstanceAsync();
    await AppInstance.run();
  } catch(err) {
    console.error(err);
  }
}

run();
