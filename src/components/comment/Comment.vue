<template>
  <div class="mtop-20 mbtm-20">
    <div class="comment-text-wrapper">
      <div class="font-20 fontbd-700 mbtm-10">
        评论
        <span class="font-14">({{ totalCount }})</span>
      </div>
      <div class="area-wrapper">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          ref="commentAreaRef"
          v-model="userCommentInfo.content"
          class="comment-text"></textarea>
        <span class="area-number font-12 author-color">{{ restNum }}</span>
      </div>
      <div class="send-wrapper">
        <button class="btn btn-white" @click="sendComment">发送</button>
      </div>
    </div>

    <div v-if="totalCount">
      <div v-if="totalCount > 10">
        <div class="font-16 font-bold">精彩评论</div>
        <!-- 最热评论 -->
        <commentList
          :commentInfo="hotComment"
          _type="hot"
          @toUserDetail="enterUserPage"
          @like="like"
          @reply="reply" />
        <div style="text-align: center; margin: 10px 0">
          <button class="btn btn-white">更多精彩评论</button>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="font-16 font-bold">最新评论</div>
      <commentList
        :commentInfo="lastedComment"
        _type="lasted"
        @toUserDetail="enterUserPage"
        @like="like"
        @reply="reply" />
      <!-- 分页 -->
      <div class="pagegination mtop-20">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="commentInfo.totalCount"
          @current-change="getNewPage" />
      </div>
    </div>
    <div v-else style="display: flex" class="author-color font-14">
      <div style="margin: auto">没有更多评论哦,快来添加评论吧~~</div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, watch, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { getComment, userComment, likeComment } from '@/Api/api_comment'
  import { useRouter } from 'vue-router'
  import commentList from './commentList.vue'
  const store = useStore()

  const router = useRouter()
  const data = reactive({
    totalCount: 0,
    // 最新评论时间
    cursor: null,
    // 热度评论信息
    commentInfo: '',
    // 热度评论
    hotComment: [],
    // 最新评论
    lastedComment: [],
  })
  const props = defineProps({
    id: {
      type: [Number, String],
      require: true,
    },
    //  0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
    type: {
      type: Number,
      require: true,
    },
  })

  onMounted(async () => {
    await GetlastCmd()
    getHotCmt()
  })
  // 获取最热评论
  const getHotCmt = async () => {
    // 评论总数小于10条，不显示热评
    if (totalCount.value < 10) return
    const res = await getComment(props.id, props.type, 2)
    console.log(res, '最热评论')
    commentInfo.value = res.data
    hotComment.value = res.data.comments.slice(0, 8)
  }
  //   获取最新评论
  const GetlastCmd = async (newPage) => {
    const res = await getComment(props.id, props.type, 3, cursor.value, newPage)
    cursor.value = res.data.cursor
    lastedComment.value = res.data.comments
    totalCount.value = res.data.totalCount
    console.log(res)
  }

  const userCommentInfo = reactive({
    /* 1评论 2回复 0删除 */
    t: 1,
    type: props.type,
    id: props.id,
    content: '',
    commentId: 0,
  })
  // 可输入字数情况
  const restNum = computed(() => {
    return 140 - userCommentInfo.content.length
  })
  // 发送评论
  const sendComment = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'warning' })
    if (restNum.value < 0)
      return ElMessage({ message: '评论过长', type: 'warning' })
    const res = await userComment(userCommentInfo)
    console.log(res)
    if (res.code != 200) return
    userCommentInfo.content = ''
    // 1s后刷新
    setTimeout(() => {
      GetlastCmd()
    }, 1000)
  }
  // 点赞
  const like = async (info) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    let obj = {
      id: props.id,
      cid: info.cid,
      t: info.liked ? 0 : 1,
      type: props.type,
    }
    const res = await likeComment(obj)
    if (info._type == 'hot') {
      hotComment.value[info.index].liked = !hotComment.value[info.index].liked
      if (info.liked) {
        hotComment.value[info.index].likedCount--
      } else {
        hotComment.value[info.index].likedCount++
      }
    }
    if (info._type == 'lasted') {
      lastedComment.value[info.index].liked =
        !lastedComment.value[info.index].liked
      if (info.liked) {
        lastedComment.value[info.index].likedCount--
      } else {
        lastedComment.value[info.index].likedCount++
      }
    }
    console.log(res)
  }

  const commentAreaRef = ref(null)
  // 回复
  const reply = (info) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'warning' })
    userCommentInfo.content = '@' + info.name + ':'
    userCommentInfo.commentId = info.cid
    userCommentInfo.t = 2

    commentAreaRef.value.focus()
  }

  watch(
    () => props.id,
    () => {
      GetlastCmd()
      getHotCmt()
    }
  )
  //   换页
  const getNewPage = (newPage) => {
    GetlastCmd(newPage)
  }

  const enterUserPage = (userId) => {
    router.push({ name: 'userDetail', params: { id: userId } })
  }
  let { cursor, commentInfo, hotComment, lastedComment, totalCount } =
    toRefs(data)
</script>
<style lang="less" scoped>
  .comment-text-wrapper {
    margin-bottom: 10px;
    .area-wrapper {
      position: relative;
      .comment-text {
        width: 100%;
        height: 50px;
        border: 1px solid #e5e5e5;
        resize: none;
        font-size: 14px;
        border-radius: 4px;
        outline: none;
        padding: 3px;
      }
      .area-number {
        position: absolute;
        right: 0;
        bottom: 5px;
      }
    }
  }

  .send-wrapper {
    display: flex;
    justify-content: flex-end;
    widows: 100%;
    height: 30px;
    .send-btn {
      border-radius: ;
    }
  }
  .pagegination {
    display: flex;
    justify-content: center;
  }
</style>
