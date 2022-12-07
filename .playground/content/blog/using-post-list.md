The `<PostList>` component lets you render a list of your posts. It's a great way to show off your latest content. You can use it in your blog page, or anywhere else you want to show off your posts.

## Usage

```vue
<PostList />
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `limit` | `Number` | `10` | The number of posts to show. |
| `skip` | `Number` | `0` | The number of posts to skip. |
| `sort` | `String` | `date` | The field to sort by. |
| `order` | `String` | `desc` | The order to sort by. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | The default slot. |
| `item` | The slot for each post. |

## Events

| Name | Description |
| ---- | ----------- |
| `click` | The event emitted when a post is clicked. |

## Examples

### Default

```vue
<PostList />
```

### Custom Item

```vue
<PostList>
  <template #item="{ post }">
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt }}</p>
  </template>
</PostList>
```

### Custom Item with Link

```vue
<PostList>
  <template #item="{ post }">
    <nuxt-link :to="post.path">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
    </nuxt-link>
  </template>
</PostList>
```

### Custom Item with Link and Click Event

```vue
<PostList>
  <template #item="{ post }">
    <nuxt-link :to="post.path" @click="onClick(post)">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
    </nuxt-link>
  </template>
</PostList>
```


