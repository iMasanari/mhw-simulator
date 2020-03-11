import { promises as fs } from 'fs'
import { dirname } from 'path'

export const readCsv = async (path: string) => {
  const text = await fs.readFile(path, 'utf-8')

  return text.trim().split('\n').slice(1)
    .map(v => v.trim().split(','))
    .filter(([cel]) => cel)
}

export const readJson = async (path: string) => {
  const text = await fs.readFile(path, 'utf-8')

  return JSON.parse(text) as unknown
}

export const writeJson = async (path: string, json: any) => {
  await fs.mkdir(dirname(path), { recursive: true })

  return fs.writeFile(path, JSON.stringify(json, null, 2))
}
