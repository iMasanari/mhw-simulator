import { promises as fs } from 'fs'
import fetch from 'node-fetch'

const sleap = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const main = async () => {
  const sheets = {
    head: 'https://docs.google.com/spreadsheets/d/1OFAc7Z8XR4cvYXy3n2m72RFSD2iTpAFakga_BLSCT5Y/export?format=csv&gid=0',
    body: 'https://docs.google.com/spreadsheets/d/1eEstWit2pmX7uhAhz0nAxgoQiJ3bPNx2yaTMLdoCb6U/export?format=csv&gid=0',
    arm: 'https://docs.google.com/spreadsheets/d/1NBedHUXFh0wnNgoDA8K-REMyjrXHF_VE3262pdUjj5g/export?format=csv&gid=0',
    wst: 'https://docs.google.com/spreadsheets/d/1HCGj4xGKE--8wXiHHmB0f-0t4qLUJeV1YtqPM7-8SN0/export?format=csv&gid=0',
    leg: 'https://docs.google.com/spreadsheets/d/1yYpBQVZ7qewXAOEydmtRLwFw9Vypwf3bEt08vA3k5fg/export?format=csv&gid=0',
    deco: 'https://docs.google.com/spreadsheets/d/1oMiUERDAU5_1PUrGwOIthN-DSonMwEHIG65sAtlxWBM/export?format=csv&gid=0',
    charm: 'https://docs.google.com/spreadsheets/d/1hNFh3nC6fIrfL4Zh2sGsshNmmzEQeKg85wNcftQOQ9Y/export?format=csv&gid=0',
    skill: 'https://docs.google.com/spreadsheets/d/1FRATMC5CrzTKPMsBKuruR0Q6e6YvRyIJE092jDPuJjk/export?format=csv&gid=0',
  }

  for (const [id, url] of Object.entries(sheets)) {
    const res = await fetch(url)
    const text = await res.text()

    await fs.writeFile(`lib/fetched/${id}.csv`, text)

    await sleap(1000)
  }
}

main()
