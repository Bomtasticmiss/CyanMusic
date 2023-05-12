<template>
  <div
    class="comment-content-wrapper"
    v-for="(item, index) in commentInfo"
    :key="item.commentId">
    <div class="comment-content font-12">
      <div
        class="comment-avator pointer"
        @click="enterUserPage(item.user.userId)">
        <img
          v-if="item.user.avatarUrl"
          :src="item.user.avatarUrl + '?param=200y200'"
          alt=""
          class="avator" />
      </div>
      <div class="content mleft-10">
        <div>
          <span style="color: rgb(80, 125, 175)"
            >{{ item.user.nickname }}:</span
          >
          <span>{{ item.content }}</span>
        </div>
        <div class="reply-content" v-if="item.beReplied!==null">
          <span
            class="font-12 pointer"
            style="margin-left: 5px; color: #507daf"
            @click="toUserDetail(item.beReplied[0].user.userId)">
            @{{ item.beReplied[0].user.nickname }}:</span
          >
          <span class="font-12">{{ item.beReplied[0].content }}</span>
        </div>
        <div class="comment-info">
          <div style="color: rgb(159, 159, 159)">
            {{ item.timeStr }}
          </div>
          <div style="display: flex; align-items: center">
            <button
              class="no-btn"
              @click="like(item.commentId, item.liked, index)">
              <span
                class="iconfont icon-31dianzan"
                :style="{ color: item.liked ? 'red' : 'black' }"></span>
              <span>
                {{ item.likedCount }}
              </span>
            </button>
            <button class="no-btn">
              <span class="iconfont icon-fenxiang"></span>
            </button>
            <button
              class="no-btn"
              style="padding-bottom: 3px"
              @click="reply(item.commentId, item.user.nickname)">
              <span class="iconfont icon-pinglun"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="line-bottom"></div>
  </div>
</template>

<script setup>
  import { reactive, toRefs } from 'vue'

  const props = defineProps(['commentInfo', '_type'])

  const emits = defineEmits(['like', 'reply', 'toUserDetail'])

  const enterUserPage = (userId) => {
    emits('toUserDetail', userId)
  }
  const like = (cid, liked, index) => {
    emits('like', { cid, liked, _type: props._type, index })
  }
  const reply = (cid, name) => {
    emits('reply', { cid, name })
  }
</script>
<style scoped lang="less">
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
  .reply-content {
      background-color: #f4f4f4;
      border-radius: 6px;
      word-break: break-all;
      word-wrap: break-word;
    }
  .line-bottom {
    width: 100%;
    border-top: 1px solid #e0e0e0;
  }
</style>
