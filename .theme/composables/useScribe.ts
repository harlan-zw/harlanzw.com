export const useScribe = () => computed(() => {
  const appConfig = useAppConfig()
  return {
    ...appConfig,
    ...appConfig.scribe || {},
  }
})
