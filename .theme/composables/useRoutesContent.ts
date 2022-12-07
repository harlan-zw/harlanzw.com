import {useAsyncData} from "#app";
import {queryContent} from "#imports";

export const useRoutesContent = <T extends Post>(path?: string) => {
  if (!path)
    path = useRoute().path
  return useAsyncData(`content:${path}`, () => queryContent<T>()
    .where({ _path: path })
    .without(['excerpt'])
    .findOne(),
  )
}
