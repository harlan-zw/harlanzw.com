<script lang="ts" setup>
const location = computed(() => {
  // set location based on the date
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  if (month === 7 && day < 26)
    return '🇬🇷 Greece'
  else if (month === 7 && day >= 26)
    return '🇹🇷 Turkey'
  else if (month === 8 && day < 8)
    return '🇹🇷 Turkey'
  else if (month === 8 && day < 15)
    return '🇧🇬 Bulgaria'
  else if (month === 8 && day >= 15 && day < 22)
    return '🇲🇰 North Macedonia'
  else if (month === 8 && day >= 22)
    return '🇦🇱 Albania'
  else if (month === 9 && day < 9)
    return '🇲🇪 Montenegro'
  else if (month === 9 && day >= 9)
    return '🇧🇦 Bosnia and Herzegovina'
  else
    return 'Europe'
})
</script>

<template>
<p>
  <slot />{{ location }}
</p>
</template>
