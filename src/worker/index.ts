import load from './load'
import search from './search'

addEventListener('message', (e) => {
  const obj = e.data

  switch (obj.action) {
    case 'load':
      load(obj.data)
      break
    case 'search':
      search(obj.data.skill, obj.data.skillList)
      break
  }
})
