import { uglify } from "rollup-plugin-uglify";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/content-script.ts",
  output: {
    file: "./temp/content-script.js",
    format: "iife",
    compact: true,
    validate: true,
  },
  plugins: [typescript(), uglify()],
};
