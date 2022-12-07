<template>
  <h2>
    <slot />
  </h2>
</template>

<style scoped>
h2 {
  background-clip: text;
  margin-bottom: $dt('space.5');
  background-image: linear-gradient(180deg, $dt('color.primary.darker'), $dt('colors.primary.dark'));
  display: inline-block;
  font-weight: $dt('fontWeight.semibold');
  font-size: $dt('fontSize.lg');
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
}
</style>
