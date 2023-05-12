<template>
  <div class="popover-wrapper" ref="wrapper">
    <slot name="reference"> </slot>

    <div
      class="popover-container"
      :style="{ width: width + 'px' }"
      v-show="visible"
      ref="container">
      <slot name="title"></slot>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, useSlots, onMounted, ref, watch } from 'vue'
  const slots = useSlots()
  const props = defineProps({
    width: {
      type: [Number, String],
      default: 200,
    },
    visible: {
      type: Boolean,
    },
  })

  const emits = defineEmits(['update:visible'])

  const wrapper = ref(null)
  watch(
    () => props.visible,
    (value) => {
      if (value) {
        window.addEventListener('click', handleClose)
      } else {
        window.removeEventListener('click', handleClose)
      }
    }
  )
  // onMounted(() => {
  //   window.addEventListener('click', handleClose)
  // })

  const container = ref(null)
  const handleClose = (e) => {
    if (!wrapper.value.contains(e.target)) {
      emits('update:visible', !props.visible)
    }
  }
</script>
<style scoped>
  .popover-wrapper {
    position: relative;
  }
  .popover-container {
    position: absolute;
    background-color: white;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);
    top: 30px;
    /* left: 20px; */
  }
</style>
