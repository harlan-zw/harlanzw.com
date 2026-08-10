import type { TweetResult } from '#shared/types'
import { consola } from 'consola'
import { z } from 'zod'

const tweetIdSchema = z.string().regex(/^\d{10,20}$/u)
const tweetSchema = z.object({
  id_str: z.string(),
  text: z.string().min(1),
  created_at: z.string(),
  favorite_count: z.number().int().nonnegative().default(0),
  conversation_count: z.number().int().nonnegative().default(0),
  user: z.object({
    name: z.string(),
    screen_name: z.string(),
    profile_image_url_https: z.string().url(),
  }),
})

export default defineCachedEventHandler(async (event): Promise<TweetResult> => {
  const parsedTweetId = tweetIdSchema.safeParse(getRouterParam(event, 'tweetId'))

  if (!parsedTweetId.success)
    throw createError({ statusCode: 400, statusMessage: 'Invalid tweet ID' })

  const SYNDICATION_URL = 'https://cdn.syndication.twimg.com'

  const url = new URL(`${SYNDICATION_URL}/tweet-result`)

  url.searchParams.set('id', parsedTweetId.data)
  url.searchParams.set('lang', 'en')
  url.searchParams.set('token', '45je2ktobmo')
  url.searchParams.set(
    'features',
    [
      'tfw_timeline_list:',
      'tfw_follower_count_sunset:true',
      'tfw_tweet_edit_backend:on',
      'tfw_refsrc_session:on',
      'tfw_show_business_verified_badge:on',
      'tfw_duplicate_scribes_to_settings:on',
      'tfw_show_blue_verified_badge:on',
      'tfw_legacy_timeline_sunset:true',
      'tfw_show_gov_verified_badge:on',
      'tfw_show_business_affiliate_badge:on',
      'tfw_tweet_edit_frontend:on',
    ].join(';'),
  )

  const response = await $fetch<unknown>(url.toString(), { responseType: 'json' })
    .then(value => ({ _tag: 'Ok' as const, value }))
    .catch((error: unknown) => ({
      _tag: 'Err' as const,
      reason: error instanceof Error ? error.message : String(error),
    }))

  if (response._tag === 'Err') {
    consola.warn(`Tweet ${parsedTweetId.data} unavailable`, response.reason)
    return { _tag: 'Err', reason: 'This embedded post is temporarily unavailable.' }
  }

  const parsedTweet = tweetSchema.safeParse(response.value)
  if (!parsedTweet.success) {
    consola.warn(`Tweet ${parsedTweetId.data} returned an invalid payload`, z.prettifyError(parsedTweet.error))
    return { _tag: 'Err', reason: 'This embedded post could not be displayed.' }
  }

  return {
    _tag: 'Ok',
    tweet: {
      id: parsedTweet.data.id_str,
      text: parsedTweet.data.text,
      createdAt: parsedTweet.data.created_at,
      favoriteCount: parsedTweet.data.favorite_count,
      replyCount: parsedTweet.data.conversation_count,
      user: {
        name: parsedTweet.data.user.name,
        screenName: parsedTweet.data.user.screen_name,
        avatarUrl: parsedTweet.data.user.profile_image_url_https,
      },
    },
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'tweet',
})
