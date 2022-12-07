export const useRepository = () => {
  const config = useRuntimeConfig()

  if (!config?.github) {
    console.warn('If you want to use `useRepository` composable, you must specify: `owner`, `repo` and `branch` in your nuxt.config `github` key.')
  }

  const last = useState<any>('scribe-last-release')

  const repository = useState<any>('scribe-repository')

  return {
    repository,
    last
  }
}
