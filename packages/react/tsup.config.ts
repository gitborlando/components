import { lessLoader } from 'esbuild-plugin-less'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const componentsDir = path.resolve(__dirname, 'src')
const components = fs.readdirSync(componentsDir).filter((name) => {
  const isDir = fs.statSync(path.join(componentsDir, name)).isDirectory()
  const exclude = ['styles', 'hooks']
  return isDir && !exclude.includes(name)
})
fs.writeFileSync(path.resolve(__dirname, 'index.d.ts'), 'indexDts')

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
  esbuildOptions(options) {
    options.alias = {
      '@utils': path.resolve(process.cwd(), '..', 'utils'),
    }
  },
  onSuccess: async () => {
    components.forEach((name) => {
      importCss(path.resolve(__dirname, 'dist', name))
    })
    exportIndex(path.resolve(__dirname, 'dist'))
  },
})

function importCss(dirname: string) {
  const jsxContent = fs.readFileSync(path.resolve(dirname, 'index.js'), 'utf-8')
  const importCss = `import './index.css'`
  const newContent = importCss + '\n' + jsxContent
  fs.writeFileSync(path.resolve(dirname, 'index.js'), newContent)
}

function exportIndex(dirname: string) {
  let indexJs = ''
  let indexDts = ''
  components.forEach((name) => {
    indexJs += `export * from './${name}'\n`
    indexDts += `export * from './${name}'\n`
  })
  fs.writeFileSync(path.resolve(dirname, 'index.js'), indexJs)
}
