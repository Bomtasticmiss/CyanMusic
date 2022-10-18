<template>
  <div class="comment-text-wrapper">
    <textarea name="" id="" cols="30" rows="10" class="comment-text"></textarea>
  </div>
  <div class="send-wrapper">
    <button class="btn btn-white">发送</button>
  </div>
  <div class="font-16 font-bold">精彩评论</div>
  <!-- 最热评论 -->
  <div
    class="comment-content-wrapper"
    v-for="comment in hotComment"
    :key="comment.commentId">
    <div class="comment-content font-12">
      <div class="comment-avator pointer">
        <img
          v-if="comment.user.avatarUrl"
          :src="comment.user.avatarUrl + '?param=200y200'"
          alt=""
          class="avator" />
      </div>
      <div class="content mleft-10">
        <div>
          <span style="color: rgb(80, 125, 175)"
            >{{ comment.user.nickname }}:</span
          >
          <span>{{ comment.content }}</span>
        </div>
        <div class="comment-info">
          <div style="color: rgb(159, 159, 159)">
            {{ comment.timeStr }}
          </div>
          <div style="display: flex; align-items: center">
            <button class="no-btn">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i
              >{{ comment.likedCount }}
            </button>
            <button class="no-btn">
              <i class="fa fa-share-square-o" aria-hidden="true"></i>
            </button>
            <button class="no-btn" style="padding-bottom: 3px">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="line-bottom"></div>
  </div>
  <div style="text-align: center; margin: 10px 0">
    <button class="btn btn-white">更多精彩评论</button>
  </div>
  <div class="font-16 font-bold">最新评论</div>
  <!-- 最新评论 -->
  <div
    class="comment-content-wrapper"
    v-for="comment in lastedComment"
    :key="comment.commentId">
    <div class="comment-content font-12">
      <div class="comment-avator pointer">
        <img
          v-if="comment.user.avatarUrl"
          :src="comment.user.avatarUrl + '?param=200y200'"
          alt=""
          class="avator" />
      </div>
      <div class="content mleft-10">
        <div>
          <span style="color: rgb(80, 125, 175)"
            >{{ comment.user.nickname }}:</span
          >
          <span>{{ comment.content }}</span>
        </div>
        <div class="comment-info">
          <div style="color: rgb(159, 159, 159)">
            {{ comment.timeStr }}
          </div>
          <div style="display: flex; align-items: center">
            <button class="no-btn">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i
              >{{ comment.likedCount }}
            </button>
            <button class="no-btn">
              <i class="fa fa-share-square-o" aria-hidden="true"></i>
            </button>
            <button class="no-btn" style="padding-bottom: 3px">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="line-bottom"></div>
  </div>
  <div class="pagegination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="commentInfo.totalCount"
      @current-change="getNewPage" />
  </div>
</template>

<script setup>
  import { reactive, toRefs, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { getPlayListCmd } from '@/Api/musicHomeList'
  const store = useStore()
  const data = reactive({
    // totalCount:0,
    // 最新评论时间
    cursor: null,
    // 热度评论信息
    commentInfo: '',
    // 热度评论
    hotComment: [],
    // 最新评论
    lastedComment: [],
  })
  const props = defineProps(['id'])

  //   const commentInfo = computed(() => {
  //     return store.state.commentInfo
  //   })
  //   const hotComment = computed(() => {
  //     return store.state.hotComment
  //   })

  //   const lastedComment = computed(() => {
  //     return store.state.lastedComment
  //   })
  //   const GetPlayListCmd = async () => {
  //     const res = await getPlayListCmd(playlist.value.id, 2)
  //     console.log(res)
  //   }
  onMounted(() => {
    GetPlayListCmd()
    getHotCmt()
  })
// 获取最热评论
  const getHotCmt = async () => {
    const res = await getPlayListCmd(props.id, 2, commentInfo.value.cursor)
    console.log(res.data.comments)
    commentInfo.value = res.data
    hotComment.value = res.data.comments.slice(0, 8)
  }
//   获取最新评论
  const GetPlayListCmd = async (newPage) => {
    const res = await getPlayListCmd(props.id, 3, cursor.value, newPage)
    cursor.value = res.data.cursor
    lastedComment.value = res.data.comments
    console.log(res)
  }
  //   换页
  const getNewPage = (newPage) => {
    GetPlayListCmd(newPage)
  }
  let { cursor, commentInfo, hotComment, lastedComment } = toRefs(data)
</script>
<style lang="less" scoped>
  .comment-text-wrapper {
    margin-bottom: 10px;
    .comment-text {
      width: 100%;
      height: 50px;
      border: 1px solid #e5e5e5;
      resize: none;
      font-size: 14px;
      border-radius: 4px;
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
  .comment-content-wrapper {
    // width: 100%;
    // height: 40px;
    .comment-content {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .comment-avator {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        .avator {
          border-radius: 50%;
          width: 100%;
        }
      }
      .content {
        flex: 1;
        line-height: 30px;
      }
    }
  }
  .comment-info {
    display: flex;
    justify-content: space-between;
  }
  .line-bottom {
    width: 100%;
    border-top: 1px solid #e0e0e0;
  }
  .pagegination{
    display: flex;
    justify-content: center;
  }
</style>
