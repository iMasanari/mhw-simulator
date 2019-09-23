import fs from 'fs'

export const head = fs.readFileSync(__dirname + '/head.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const body = fs.readFileSync(__dirname + '/body.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const arm = fs.readFileSync(__dirname + '/arm.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const wst = fs.readFileSync(__dirname + '/wst.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const leg = fs.readFileSync(__dirname + '/leg.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const charm = fs.readFileSync(__dirname + '/charm.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)

export const deco = fs.readFileSync(__dirname + '/deco.txt', 'utf-8')
  .split('\n').filter(Boolean).map(v => v.split(' ')).reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, string>)
