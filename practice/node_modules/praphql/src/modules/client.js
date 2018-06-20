import merge from 'merge-options'

export default ({ url }) => {
  const cache = {}
  const listeners = {}

  const getCached = (key) => {
    if (!key) return null
    return cache[key]
  }

  const emit = (key) => {
    if (listeners[key]) {
      listeners[key].forEach(l => l(cache[key]))
    }
  }

  const storeInCache = (key) => (data) => {
    if (!key) return data

    const cached = cache[key] || {}
    const obj = merge(cached, data)
    cache[key] = obj

    emit(key)

    return obj
  }

  const appendToCache = (key) => (data) => {
    if (!key) return data

    Object.keys(data).forEach(k => {
      if (!cache[key][k]) cache[key][k] = []

      cache[key][k].push(data[k])
    })

    emit(key)

    return data
  }

  return {
    query: (query, variables = {}, cacheKey) => {
      const cached = getCached(cacheKey)

      if (cached) return Promise.resolve(cached)

      const body = JSON.stringify({
        query,
        variables
      })

      return fetch(url, {
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
        .then(r => r.json())
        .then(r => r.data)
        .then(storeInCache(cacheKey))
    },

    mutate: (query, variables = {}, { updateCache, appendCache }) => {
      const body = JSON.stringify({
        query,
        variables
      })

      return fetch(url, {
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
        .then(r => r.json())
        .then(r => r.data)
        .then(
          updateCache ? storeInCache(updateCache) : d => d
        )
        .then(
          appendCache ? appendToCache(appendCache) : d => d
        )
    },

    listenTo: (cacheKey, cb) => {
      if (!listeners[cacheKey]) listeners[cacheKey] = []
      listeners[cacheKey].push(cb)
    },

    clearCache: () => {
      Object.keys(listeners).forEach(key => {
        cache[key] = null
        delete cache[key]
        emit(key)
      })
    }
  }
}
