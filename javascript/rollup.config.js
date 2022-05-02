import resolve from "@rollup/plugin-node-resolve";
import { version } from "./package.json";
import { terser } from 'rollup-plugin-terser';

const year = new Date().getFullYear();

const banner = `/*!
  Peity Vanila Rails ${version}
  Copyright © ${year} RailsJazz
  https://railsjazz.com
 */
`;

export default [
  {
    input: "index.js",
    output: [
      {
        file: "../app/assets/javascripts/peity-vanilla-rails.esm.js",
        format: "es",
        banner,
      },
      {
        name: "peity",
        file: "../app/assets/javascripts/peity-vanilla-rails.min.js",
        format: "iife",
        banner: banner,
        plugins: [terser()]
      },
    ],
    plugins: [
      resolve(),
    ],
    watch: {
      include: "**",
    },
  },
  {
    input: "peity_vanilla.js",
    output: [
      {
        file: "../app/assets/javascripts/peity-vanilla.esm.js",
        format: "es",
      },
      {
        name: "peity",
        file: "../app/assets/javascripts/peity-vanilla.min.js",
        format: "iife",
        plugins: [terser()]
      },
    ],
    plugins: [
      resolve(),
    ],
    watch: {
      include: "**",
    },
  },
];
