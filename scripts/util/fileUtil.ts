import { promises as fs } from 'fs'

export const readCsv = async (path: string) => {
  const text = await fs.readFile(path, 'utf-8')

  return text.trim().split('\n').slice(1)
    .map(v => v.trim().split(','))
    .filter(([cel]) => cel)
}

export const writeJson = (path: string, json: any) =>
  fs.writeFile(path, JSON.stringify(json, null, 2))
