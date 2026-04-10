import java from "java";
import path from "path";

java.classpath.push(path.join(__dirname, "..", "bin"));

async function run() {
  try {
    const mainArgs = java.newArray("java.lang.String", []);
    java.callStaticMethodSync("HelloWorld", "main", mainArgs);
  } catch(err) {
    console.error({ err });
  } finally {
    process.exit(0);
  }
}

run();
