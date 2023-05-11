<template>
  <div class="wrap">
    <div class="businessScopeWrapper">
      <div
        class="businessScopeContent"
        :class="{ expanded: isExpanded }"
        ref="containerRef"
      >
        <div
          v-if="hasMoreBtn && !isExpanded"
          className="viewMore"
          @click="isExpanded = !isExpanded"
        >
          展开
        </div>
        vue3删除了create生命周期，其他方法前面加上on进行访问，例如onMounted、onUpdated，同时新增setup属性
        （比created更早执行,同时setup中this不会指向实例），更贴近于html写法，这个方法在onBeforeMounted之前被调用，
        同时vue3在生命周期中也删除了this指向，所有的方法必须自己在vue实例中调用
        <div
          v-if="hasMoreBtn && isExpanded"
          :class="{ viewMore: true, expanded: isExpanded }"
          @click="isExpanded = !isExpanded"
        >
          收起
        </div>
      </div>
    </div>
  </div>
  <div class="wrapper">
    <input id="exp1" class="exp" type="checkbox" />
    <div class="text">
      <label class="btn" for="exp1"></label>
      浮动元素是如何定位的
      正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
      在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const hasMoreBtn = ref(false);
const isExpanded = ref(false);
const containerRef = ref();

onMounted(() => {
  // console.log("containerRef", containerRef.value.scrollHeight);
  // console.log("containerRef", containerRef.value.clientHeight);
  /** 判断当前盒子的scrollHeight是否大于clientHeight，来确定是否应该展示'展开''收起'按钮 */
  if (containerRef.value) {
    if (containerRef.value.scrollHeight > containerRef.value.clientHeight)
      hasMoreBtn.value = true;
  }
});
</script>

<style lang="less" scoped>
.wrap {
  width: 300px;
  border: 1px solid red;
  .businessScopeWrapper {
    height: fit-content;
    .businessScopeContent {
      font-size: 13px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //可折行的行数
      -webkit-box-orient: vertical;
      &::before {
        content: "";
        float: right;
        width: 0;
        height: 22px;
      }
      &.expanded {
        -webkit-line-clamp: unset;
        white-space: normal;
        &::before {
          display: none;
        }
      }
      .viewMore {
        font-size: 13px;
        line-height: 18px;
        color: #0171f6;
        cursor: pointer;
        float: right;
        clear: both;
        &.expanded {
          display: inline-block;
          float: none;
        }
      }
    }
  }
}

.wrapper {
  display: flex;
  margin: 50px auto;
  width: 800px;
  overflow: hidden;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.text {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
}
.text::before {
  content: "";
  height: calc(100% - 24px);
  float: right;
}
.text::after {
  content: "";
  width: 999vw;
  height: 999vw;
  position: absolute;
  box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
  margin-left: -100px;
}
.btn {
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 16px;
  padding: 0 8px;
  background: #3f51b5;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  /* margin-top: -30px; */
}
.btn::before {
  content: "展开";
}
.exp {
  display: none;
}
.exp:checked + .text {
  -webkit-line-clamp: 999;
}
.exp:checked + .text::after {
  visibility: hidden;
}
.exp:checked + .text .btn::before {
  content: "收起";
}
</style>
