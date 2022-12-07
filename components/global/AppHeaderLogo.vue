<script setup lang="ts">
const scribe = useScribe()

const initials = scribe.value.name
  .split(' ')
  .map(word => word[0].toLowerCase())
  .join('')
</script>
<template>
<NuxtLink to="/" class="app-header-logo" title="Go Home">
  <NuxtImg
    :src="scribe.logo"
    width="80"
    height="80"
    :alt="scribe.title"
    class="app-header-logo__logo"
  />
  <div aria-label="Harlan Wilton Initials" class="app-header-logo__initials-wrap">
    <span class="app-header-logo__initials">{{ initials }}</span>
    <span class="app-header-logo__initials">{{ initials }}</span>
  </div>
</NuxtLink>
</template>

<style scoped>
.app-header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: $dt('space.4') 0;
}

.app-header-logo__logo {
  border-radius: $dt('radii.md');
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.75rem;
  transition: 0.2s;
}

.app-header-logo__initials-wrap {
  display: none;
  position: relative;
  top: 0.5rem;
}

@media (min-width: 640px) {
  .app-header-logo__initials-wrap {
    display: block;
  }
}

.app-header-logo:hover {
  filter: drop-shadow(0 0 35px #11998e);
}

.app-header-logo:hover span {
  background: linear-gradient(90deg, #11998e, #38ef7d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(0px) translateY(18px) skewX(-10deg);
}

.app-header-logo:hover span:nth-of-type(2) {
  filter: drop-shadow(0 0 10px #38ef7d);
  transform: translateX(0) translateY(-18px) skewX(-10deg);
}

.app-header-logo__initials {
  display: block;
  font-size: $dt('fontSizes.3xl');
  line-height: $dt('leads.9');
  transform: skewX(-10deg);
  font-weight: 400;
  transition: 0.2s;
  background: linear-gradient(90deg, rgba(17,153,142,.3), rgba(56,239,125,.3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.app-header-logo__initials:nth-of-type(2) {
  background: linear-gradient(90deg, #38ef7d, #11998e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(-3px) translateY(-17px) skewX(-10deg);
}
</style>
