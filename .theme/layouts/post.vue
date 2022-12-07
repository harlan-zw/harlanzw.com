<script lang="ts" setup>
const { page: post } = useContent()
</script>

<template>
  <Container>
    <SchemaOrgArticle
    />
    <Breadcrumbs class="mb-2" />
    <h1>
      {{ post.title }}
    </h1>
    <TagList :tags="post.tags" class="mb-5" />
    <PostMeta :post="post" />

    <article>
      <div class="prose-wrap">
        <Prose>
          <ContentRenderer :value="post" />
        </Prose>
        <DocsPrevNext />
      </div>
      <div
        class="toc"
      >
        <div class="toc-wrapper">
          <button @click="isOpen = !isOpen">
            <span class="title">Table of Contents</span>
            <Icon name="heroicons-outline:chevron-right" class="icon" :class="[isOpen && 'rotate']" />
          </button>

          <div class="docs-toc-wrapper" :class="[isOpen && 'opened']">
            <DocsToc @move="isOpen = false" />
          </div>
        </div>
      </div>
    </article>

  </Container>
</template>
<style scoped lang="ts">
css({
'.prose-wrap': {
  maxWidth: '88ch',
  margin: '0 auto 0 0',
},
article: {
  display: 'flex',
},
h1: {
  fontSize: '{prose.h1.fontSize}',
  fontWeight: '{fontWeight.bold}',
},
'.toc': {
position: 'sticky',
top: '{scribe.header.height}',
display: 'flex',
alignItems: 'center',
mx: 'calc(0px - {space.4})',
'@sm': {
          mx: 'calc(0px - {space.6})',
        },
'@lg': {
          maxHeight: '{scribe.page.height}',
          gridColumn: 'span 2 / span 2',
          mx: 0,
          alignSelf: 'flex-start',
          py: '{space.8}',
        },
'.toc-wrapper': {
width: '100%',
backdropFilter: '{backdrop.filter}',
backgroundColor: '{backdrop.background}',
px: '{space.4}',
'@sm': {
          px: '{space.6}',
        },
'@lg': {
          px: 0,
          backgroundColor: 'transparent',
          backdropFilter: 'none'
        },
button: {
display: 'flex',
alignItems: 'center',
py: '{space.3}',
width: '100%',
height: '100%',
'@lg': {
          display: 'none'
        },
'.title': {
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.semibold}',
          marginRight: '{space.1}',
        },
'.icon': {
width: '{space.4}',
height: '{space.4}',
transition: 'transform 100ms',
'&.rotate': {
            transform: 'rotate(90deg)'
          }
}
},
'.docs-toc-wrapper': {
display: 'none',
marginBottom: '{space.4}',
'&.opened': {
            display: 'block'
          },
'@lg': {
          marginTop: 0,
          display: 'block'
        }
}
}
}
})
</style>
