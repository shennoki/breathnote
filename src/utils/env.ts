export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || ''
export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || ''
export const SITE_SUBTITLE = process.env.NEXT_PUBLIC_SITE_SUBTITLE || ''
export const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || ''
export const ARTICLE_PER_PAGE = Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE) || 12
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''
export const REVALIDATE_TIME = Number(process.env.REVALIDATE_TIME) || 60

export const API_KEY = process.env.API_KEY || ''
export const API_ENDPOINT = process.env.API_ENDPOINT || ''
export const DRAFT_TOKEN = process.env.DRAFT_TOKEN || ''
