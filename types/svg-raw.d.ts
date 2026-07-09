// Raw SVG markup imports, e.g. `import svg from "@/public/foo.svg?raw"`.
// Enabled by the webpack `asset/source` rule in next.config.mjs.
declare module "*.svg?raw" {
  const content: string;
  export default content;
}
