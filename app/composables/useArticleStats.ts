import type { Ref } from 'vue'
import { isFreshReading } from '#shared/utils/article-stats'

export function useArticleStats(element: Ref<HTMLElement | null>) {
  const visible = useElementVisibility(element)
  const documentVisibility = useDocumentVisibility()
  const now = useNow({ interval: 10_000 })
  const { data, status, error, refresh } = useFetch('/api/article-stats', { server: false, immediate: false, retry: 0 })
  const current = computed(() => data.value && isFreshReading(data.value.host.updatedAt, now.value.getTime()) ? data.value : null)
  const agents = computed(() => current.value?.agents._tag === 'Available' && isFreshReading(current.value.agents.updatedAt, now.value.getTime()) ? current.value.agents : null)
  const runners = computed(() => current.value?.runners._tag === 'Available' && isFreshReading(current.value.runners.updatedAt, now.value.getTime()) ? current.value.runners : null)
  const observedAt = computed(() => current.value ? new Date(current.value.host.updatedAt).toLocaleTimeString() : '')
  const active = computed(() => visible.value && documentVisibility.value === 'visible')
  function update() {
    if (status.value !== 'pending')
      return refresh()
  }
  const { pause, resume } = useIntervalFn(update, 30_000, { immediate: false })
  watch(active, (value) => {
    if (value) {
      update()
      resume()
    }
    else {
      pause()
    }
  })
  return { current, agents, runners, observedAt, status, error, update }
}
