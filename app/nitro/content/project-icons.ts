import { $fetch } from 'ohmyfetch'
import {ParsedContent} from "~/types";

export async function ProjectIcons(content: ParsedContent) {
  if (content._file !== '_projects.json')
    return content

  for (const ecosystem of content.body) {
    for (const project of ecosystem.projects) {
      const { repo } = await $fetch(`https://ungh.cc/repos/${project.repo}`)
      project.stars = repo.stars
      project.description = repo.description
      project.updatedAt = repo.updatedAt
    }
  }

  return content
}
