<template>
  <div class="textWrap">
    <Clamp
      autoResize
      text="追啊会死哦还可获得可结案好看点啥开会说断开连接安徽省考了解到哈会计师抵抗力哈会计师断开连接哈阿达克时间到了"
      :max-lines="1"
      :expanded="expanded"
    >
      <template #after="{ toggle, expanded }">
        <span @click="toggle">
          {{ !expanded ? '展开' : '收起' }}
        </span>
      </template>
    </Clamp>
  </div>
</template>

<script setup lang="ts">
import Clamp from './clamp/index.vue';
import { ref } from 'vue';
const expanded = ref(false);
</script>

<style lang="less" scoped>
.textWrap {
  max-width: 200px;
}
</style>
