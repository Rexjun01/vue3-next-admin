<template>
  <div class="wrap" ref="containerRef">
    <div class="content" ref="mainRef">
      <div className="titleNew" title='浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。'>
        <div class="text">{{'浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。'}}</div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
/** title应该设置成动态显示，根据isShow判断 */
import { onMounted, ref } from "vue";
const isShow = ref(false);
const containerRef = ref();
const mainRef = ref();

onMounted(() => {
  /** 判断containerRef盒子的scrollHeight是否大于mainRef盒子clientHeight，来确定是否应该展示'展开''收起'按钮 */
  if (containerRef.value && mainRef?.value) {
    if (containerRef.value.scrollHeight > mainRef.value.clientHeight){
      isShow.value = true;
    }else{
      isShow.value = false;
    }
  }
});
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1; //此处应该动态设置
  -webkit-box-orient: vertical;
  overflow: hidden;
  .content {
    width: 100%;
    line-height: normal;
    white-space: break-spaces;
    word-break: break-all;
    .titleNew {
      position: relative;
      max-width: 300px; //此处应该动态设置
    }
    .text {
      font-size: 15px;
      /* height: 23px;  千万不能设置height，否则clamp会失效*/
      font-weight: 400;
      color: #141414;
      line-height: 23px;
    }
  }
}
</style>
