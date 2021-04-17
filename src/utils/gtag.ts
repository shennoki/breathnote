import { GA_TRACKING_ID } from 'utils/env'

type GaEventProps = {
  action: string
  category: string
  label: string
  value?: number
}

export const event = ({ action, category, label, value }: GaEventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
