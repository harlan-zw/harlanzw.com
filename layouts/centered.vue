<template>
  <div class="layout-single-page">
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout-single-page {
  height: calc(100vh - 150px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
> div {
  margin-bottom: 10%;
}
:deep(h1) svg {
  display: none;
}
}
</style>
