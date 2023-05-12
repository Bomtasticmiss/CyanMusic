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

### 后端API接口地址

[https://github.com/Bomtasticmiss/NeteaseCloudMusicApi.git](https://github.com/Bomtasticmiss/NeteaseCloudMusicApi.git)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 目前完成功能

- 主页：个性推荐，歌单，排行榜，歌手，新歌速递
- 登录：轮询二维码登录
- 视频：主页详情，视频详情，MV页面，MV详情
- 用户：主页详情
- 音乐播放器：播放，进度条，音量调整，播放列表
- 菜单：用户歌单(收藏，创建)
- 搜索页面：单曲, 专辑,  歌手, 歌单, 用户, MV,  歌词,  电台,  视频,综合, 声音，
- 歌手：主页详情（top50专辑），简介
- 各页面用户评论点赞功能
- 简单响应式页面适配
- 简易换肤功能

### 目前已知BUG
- vue3 el-image组件加载时设定必须设置高度导致无法更好自适应(待解决)
- 播放器进行切换时由于使用vuex无法提前知道歌曲是否有无版权，导致播放歌曲对象有图像无播放资源(待解决)
- 歌词拖拽无法在符合条件下回弹(已解决/防抖)
- 歌单详情正在播放歌曲高亮显示切换页面后依旧高亮(增加判断trackid解决依旧高亮显示)
- 由于router-view加key防止动态路由页面不刷新与menu菜单切换页面时闪烁冲突（用户体验差），目前解决办法是playlistDetail,videoDetail页面手动监听路由重载数据(还没有找到更好的解决办法)
- 菜单高亮不会随着路由前进后退而改变,修复改善用户体验(已解决/通过菜单组件监听route，实时高亮)
- 改善自定义tablelist组件的布局及响应式(待解决)
- /like接口在删除添加喜欢音乐后具有延迟，如果此时刷新页面，可能导致音乐存在喜欢列表里但没有显示已喜欢按钮
- chrome在66版本后audio标签设置autoplay初始加载必须在与用户交互后才能自动播放
- 自定义指令v-load与vue-router(v4.x)的过度动画冲突产生bug，由于最新的过度动画切换瞬间上一个组件与下一个组件同时存在导致的bug
### UPDATE
- 拖动自定义播放器进度条时会触发点击默认事件导致卡顿(已解决)
- 解决用户在滑动歌词时高亮歌词跳转到下一句时scrollTop弹回原位置(利用防抖解决)，再实时监听scrollTop的位置，实时弹回高亮歌词位置(不监听的话只能在歌词跳转到下一句时位置会回弹)
- 修复歌曲切换时歌词对象时与传进lyric组件的props.currentTime发生冲突报错
- 解决用户创建歌单详情页面点击收藏按钮、弹错(禁止点击事件)
- 修复路由地址改变srcoll位置不变的bug
- 解决移动端flex布局超出屏幕
- 修复正在播放歌曲只依靠索引而导致不同页面也显示正在播放的bug 
-修复normal歌曲切换到Fm歌曲时由于对象格式错误报错，可能是vue3与vuex发导致的bug


