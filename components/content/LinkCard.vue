<template>
<div class="article-card md:-mx-8 mb-8 hover:shadow-lg transition-all text-lg">
  <div class="article-card__effect"></div>
  <div class="bg-white rounded-lg md:p-8 p-4">
    <slot></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.article-card {

  position: relative;

  &__effect {
    z-index: -1;
    content: ' ';
    height: 30px;
    width: 672px;
    position: absolute;
    background-size: 800px;
    border-radius: 8px;
    background-image: linear-gradient(0deg, rgb(5, 150, 105), rgb(5, 200, 150) );
    transition: 1s;
    opacity: 0;
    top: 0
  }

  &:hover {
    transform: translateY(-3px);
    .article-card__effect {
      top: -5px;
      opacity: 1;
      animation: effect  3s;
      animation-fill-mode: both;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes effect {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0.35deg);
  }
  100% {
    transform: rotate(-0.35deg);
    background-position: 672px;
  }
}
</style>
