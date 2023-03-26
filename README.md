# vue-cyanmusic

## 下载项目依赖
```
npm install
```

### 运行项目
```
npm run serve
```

### 编译打包
```
npm run build
```

### 检查修复
```
npm run lint
```

### [后端API接口地址](https://github.com/Bomtasticmiss/NeteaseCloudMusicApi.git)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 目前完成功能

- 主页：个性推荐，歌单，排行榜，歌手，新歌速递
- 登录：轮询二维码登录
- 视频：主页详情，视频详情，MV页面，MV详情
- 用户：主页详情
- 播放器：播放，进度条，音量调整，播放列表
- 菜单：用户歌单(收藏，创建)
- 简单响应式页面适配

### 目前已知BUG
- vue3 el-image组件加载时设定必须设置高度导致无法更好自适应(待解决)
- 播放器进行切换时由于使用vuex无法提前知道歌曲是否有无版权，导致播放歌曲对象有图像无播放资源(待解决)
- 歌词拖拽无法在符合条件下回弹(待解决)
### UPDATE
- 拖动自定义播放器进度条时会触发点击默认事件导致卡顿(已解决)
- 解决用户创建歌单详情页面点击收藏按钮、弹错(禁止点击事件)
- 修复路由地址改变srcoll位置不变的bug
- 解决移动端flex布局超出屏幕

