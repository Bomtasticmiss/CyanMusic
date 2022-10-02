const { defineConfig } = require('@vue/cli-service')
// element-plus按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
// const Icons = require('unplugin-icons/webpack')
// const IconsResolver = require('unplugin-icons/resolver')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // webpack配置
  configureWebpack: {
    // 插件
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver(),
          // 自动导入图标组件
          // IconsResolver({
          //   prefix: 'Icon',
          // }),
        ],

      }),
      Components({
        resolvers: [ElementPlusResolver(),
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep'],
          // }),
        ],
      }),
      // Icons({
      //   autoInstall: true,
      // }),
    ],
  }
})
