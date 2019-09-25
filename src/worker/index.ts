import load from './load'

addEventListener('message', (e) => {
  const obj = e.data

  switch (obj.action) {
    case 'load':
      load(obj.data)
      break
  }
})
