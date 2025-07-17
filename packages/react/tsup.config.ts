import { lessLoader } from 'esbuild-plugin-less'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 获取所有组件目录
const componentsDir = path.resolve(__dirname, 'src')
const components = fs
  .readdirSync(componentsDir)
  .filter((name) => fs.statSync(path.join(componentsDir, name)).isDirectory())

export default defineConfig({
  entry: components.map((name) => `src/${name}/index.tsx`),
  outDir: 'dist',
  format: 'esm',
  // minify: true,
  dts: true,
  clean: true,
  esbuildPlugins: [
    lessLoader({
      javascriptEnabled: true,
    }),
  ],
  onSuccess: async () => {
    components.forEach((name) => {
      importCss(path.resolve(__dirname, 'dist', name))
    })
  },
})

function importCss(dirname: string) {
  const jsxContent = fs.readFileSync(path.resolve(dirname, 'index.js'), 'utf-8')
  const importCss = `import './index.css'`
  const newContent = importCss + '\n' + jsxContent
  fs.writeFileSync(path.resolve(dirname, 'index.js'), newContent)
}
