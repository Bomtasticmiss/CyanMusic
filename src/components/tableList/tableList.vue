<template>
  <div class="tableList-wrapper">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="list "
        :style="{ background: index % 2 == 1 ? '#ffffff' : '#f9f9f9' }"
        @click="clickEvent(item,index)">
        <div
          class="font-14 author-color"
          :style="{
            'flex-basis': '5%'
          }"
          v-if="isIndex">
          <slot name="t-index" :item="item">
          <span>{{ index+1<10?'0'+(index+1):index+1 }}</span>
          </slot>
        </div>
        <div
          class="font-14"
          :style="{
            'flex-basis': typeof tDefault == 'number' ? tDefault + '%' : tDefault
          }">
          <slot  :item="item"></slot>
        </div>
        <div
          class="font-14"
          :style="{
            'flex-basis': typeof tImg == 'number' ? tImg + '%' : tImg,
            'flex-shrink':'0'
          }">
          <slot name="t-img" :item="item"></slot>
        </div>
        <div
          class="font-14 text-hidden"
          :style="{
            'flex-basis': typeof tTitle == 'number' ? tTitle + '%' : tTitle,
          }">
          <slot name="t-title" :item="item"></slot>
        </div>
        <div
          class="font-12 author-color text-hidden"
          :style="{
            'flex-basis': typeof tCount == 'number' ? tCount + '%' : tCount,
          }">
          <slot name="t-count" :item="item"></slot>
        </div>
        <div
          class="font-12 author-color text-hidden"
          :style="{
            'flex-basis': typeof tName == 'number' ? tName + '%' : tName,
          }">
          <slot name="t-name" :item="item"></slot>
        </div>
        <div
          class="font-12 author-color text-hidden"
          :style="{
            'flex-basis':
              typeof tPlaycount == 'number' ? tPlaycount + '%' : tPlaycount,
          }">
          <slot name="t-playcount" :item="item"></slot>
        </div>
        <div
          class="font-14 text-hidden"
          :style="{
            'flex-basis': typeof tIcon == 'number' ? tIcon + '%' : tIcon,
          }">
          <slot name="t-icon" :item="item"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { reactive, toRefs } from 'vue'
  const props = defineProps({
    data: {
      type: Array,
      require: true,
    },
    isIndex:{
      type:Boolean,
      require:false
    },
    tDefault:{
      type: [Number, String],
      default: 'auto',
    },
    tImg: {
      type: [Number, String],
      default: 'auto',
    },
    tTitle: {
      type: [Number, String],
      default: 'auto',
    },
    tName: {
      type: [Number, String],
      default: 'auto',
    },
    tCount: {
      type: [Number, String],
      default: 'auto',
    },
    tPlaycount: {
      type: [Number, String],
      default: 'auto',
    },
    tIcon: {
      type: [Number, String],
      default: 'auto',
    },
  })

  const emits = defineEmits(['rowClick'])

  const clickEvent = (item,index) => {
    // console.log(item)
    emits('rowClick',item,index)
  }
</script>
<style scoped lang="less">
  .tableList-wrapper {
    .list {
      padding: 5px 5px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #dededec1 !important;
      }
      flex-basis: ;
    }
  }
</style>
