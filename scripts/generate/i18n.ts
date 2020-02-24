import { readJson, writeJson } from '../util/fileUtil'
import fromEntries from '../util/fromEntries'

export const overrideI18n = async (ns: string, list: string[]) => {
  for (const lng of ['en']) {
    const path = `src/locales/${lng}/${ns}.json`
    const json = await readJson(path) as Record<string, string>

    await writeJson(path, fromEntries(list.map(v => [v, json[v] ?? ''])))
  }
}
