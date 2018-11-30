import typescript from "rollup-plugin-typescript2";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import loadz0r from "rollup-plugin-loadz0r";

export default [{
  input: "src/bootstrap.ts",
  output: {
    file: "dist/bootstrap.js",
    format: "amd"
  },
  plugins: [
    typescript({
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true
        }
      }
    }),
    nodeResolve(),
    loadz0r(),
    terser(),
  ]
},{
  input: "src/worker.ts",
  output: {
    file: "dist/worker.js",
    format: "amd"
  },
  plugins: [
    typescript({
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true
        }
      }
    }),
    nodeResolve(),
    loadz0r(),
    terser()
  ]
}
]
