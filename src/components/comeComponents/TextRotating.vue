<template>
  <div class="rotating-text">
    <p>CSS Animation is</p>
    <p>
      <span
        v-for="(item, i) in list"
        :ref="
          (el) => { 
            if (el) words[i] = el;
          }
        "
        :key="i"
        :class="['word', item[0]]"
        >{{ item[1] }}.</span
      >
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = ref([]);

const list = [
  ['alizarin', 'awesome'],
  ['wisteria', 'beautiful'],
  ['peter-river', 'creative'],
  ['emerald', 'fabulous'],
  ['sun-flower', 'interesting'],
];

onMounted(() => {
  words.value.forEach((word) => {
    let letters = word.textContent.split('');
    word.textContent = '';
    letters.forEach((letter) => {
      let span = document.createElement('span');
      span.textContent = letter;
      span.className = 'letter';
      word.append(span);
    });
  });

  let currentWordIndex = 0;
  let maxWordIndex = words.value.length - 1;
  words.value[currentWordIndex].style.opacity = '1';

  let rotateText = () => {
    let currentWord = words.value[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words.value[0] : words.value[currentWordIndex + 1];
    // console.log('currentWord.children',currentWord.children);
    // rotate out letters of current word
    Array.from(currentWord.children).forEach((letter, i) => {
      setTimeout(() => {
        letter.className = 'letter out';
      }, i * 80);
    });
    // reveal and rotate in letters of next word
    nextWord.style.opacity = '1';
    Array.from(nextWord.children).forEach((letter, i) => {
      letter.className = 'letter behind';
      setTimeout(() => {
        letter.className = 'letter in';
      }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
  };

  rotateText();
  setInterval(rotateText, 3000);
});
</script>

<style scoped lang="less">
.rotating-text {
  font-weight: 600;
  font-size: 36px;
  color: #444;
  margin: 300px;

  p {
    display: inline-flex;
    margin: 0;
    vertical-align: top;

    &:first-child {
      margin-right: 10px;
    }

    .word {
      position: absolute;
      display: flex;
      opacity: 0;
    }
  }
}

// palette: https://flatuicolors.com/palette/defo
.alizarin {
  color: #e74c3c;
}

.wisteria {
  color: #8e44ad;
}

.peter-river {
  color: #3498db;
}

.emerald {
  color: #2ecc71;
}

.sun-flower {
  color: #f1c40f;
}
</style>

<style lang="less">
.dark {
  .rotating-text {
    color: #ccc;
  }
}
.letter {
  transform-origin: center center 25px;

  &.out {
    transform: rotateX(90deg);
    transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
  }
  &.in {
    transition: 0.38s ease;
  }
  &.behind {
    transform: rotateX(-90deg);
  }
}
</style>