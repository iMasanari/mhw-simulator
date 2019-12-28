export const sendSearchResultEvent = () =>
  gtag('event', 'click', { 'event_category': 'search result', })

export const sendSearchSkillEvent = () =>
  gtag('event', 'click', { 'event_category': 'search skill' })
