import { BuildConfig } from 'unbuild'

export const baseBuildConfig: BuildConfig = {
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: true,
  },
  failOnWarn: false,
}
