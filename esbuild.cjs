const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

const JAR_NAME = "react-jaylib-1.0-SNAPSHOT.jar";
const plugins = [
  {
    name: "copyJar",
    setup(build) {
      build.onEnd(_result => {
        fs.copyFileSync(path.join(__dirname, `native/target/${JAR_NAME}`), path.join(__dirname, `bin/${JAR_NAME}`))
      });
    }
  }
]

const config = {
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'dist/bundle.js',
  target: 'es2018',
  platform: 'node',
  external: ['react', 'react-reconciler'],
  loader: {
    '.jsx': 'jsx',
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
};

esbuild.build(config).catch(() => process.exit(1));
