import postcss from 'rollup-plugin-postcss'
import { defineBuildConfig } from 'unbuild'
import { baseBuildConfig } from '../../build.config'

export default defineBuildConfig({
  ...baseBuildConfig,
  externals: ['react'],
  hooks: {
    'rollup:options'(_, options) {
      options.plugins ||= []
      options.plugins.push(
        postcss({
          extensions: ['.less'],
          extract: 'index.css', // 明确指定 CSS 输出文件名，避免声明文件混淆
          minimize: true,
          use: {
            less: { javascriptEnabled: true },
            sass: null,
            stylus: null,
          },
        }),
      )
    },
  },
})
