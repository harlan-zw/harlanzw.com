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
  else if (month === 9 && day >= 9 && day < 16)
    return '🇧🇦 Bosnia and Herzegovina'
  else if (month === 9 && day >= 16 && day <= 18)
    return '🇭🇷 Croatia'
  else if (month === 9 && day > 18 && day < 25)
    return '🇸🇮 Slovenia'
  else if (month === 9 && day >= 25 && day < 28)
    return '🇭🇺 Hungary'
  else if (month === 9 && day >= 28 && day < 30)
    return '🇦🇹 Austria'
  else if (month === 9 && day === 30)
    return '🇨🇿 Czech Republic'
  else if (month === 10 && day < 5)
    return '🇩🇪 Germany'
  else if (month === 10 && day >= 5 && day < 8)
    return '🇳🇱 Netherlands'
  else if (month === 10 && day >= 8 && day < 18)
    return '🇫🇷 France'
  else if (month === 11 && day <= 2)
    return '🇯🇵 Japan'
  return '🇦🇺 Sydney'
})
</script>

<template>
  <p>
    <slot />{{ location }}
  </p>
</template>
