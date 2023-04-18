<template>
  <div class="mtop-20 mbtm-20">
    <div class="comment-text-wrapper">
      <div class="font-20 fontbd-700 mbtm-10">
        评论
        <span class="font-14">({{ totalCount }})</span>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="comment-text"></textarea>
    </div>
    <div class="send-wrapper">
      <button class="btn btn-white">发送</button>
    </div>
    <div v-if="totalCount">
      <div class="font-16 font-bold">精彩评论</div>
      <!-- 最热评论 -->
      <div
        class="comment-content-wrapper"
        v-for="comment in hotComment"
        :key="comment.commentId">
        <div class="comment-content font-12">
          <div class="comment-avator pointer" @click="enterUserPage(comment.user.userId)">
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
      <!-- 最新评论 -->
      <div class="font-16 font-bold">最新评论</div>
      <div
        class="comment-content-wrapper"
        v-for="comment in lastedComment"
        :key="comment.commentId">
        <div class="comment-content font-12">
          <div class="comment-avator pointer" @click="enterUserPage(comment.user.userId)">
            <img
              v-if="comment.user.avatarUrl"
              v-lazy="comment.user.avatarUrl + '?param=200y200'"
              alt="头像"
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
  import { reactive, toRefs, watch, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { getComment } from '@/Api/api_comment'
  import {useRouter} from "vue-router"
  const store = useStore()

  const router=useRouter()
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

  onMounted(() => {
    GetlastCmd()
    getHotCmt()
  })
  // 获取最热评论
  const getHotCmt = async () => {
    const res = await getComment(
      props.id,
      props.type,
      2,
      commentInfo.value.cursor
    )
    console.log(res.data.comments)
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

  const enterUserPage=(userId)=>{
    router.push({name:'userDetail',params:{id:userId}})
  }
  let { cursor, commentInfo, hotComment, lastedComment, totalCount } =
    toRefs(data)
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
      outline: none;
      padding: 3px;
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
  .pagegination {
    display: flex;
    justify-content: center;
  }
</style>
