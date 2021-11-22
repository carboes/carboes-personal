import fs from 'fs'
import { getEnv } from './utils/env'
import boxShaderMap from './crate_rarity_map.json'

interface Env {
  META_BACKEND_BASE_URI: string
  SUPPLY: number
}
const { META_BACKEND_BASE_URI, SUPPLY } = getEnv<Env>([
  'META_BACKEND_BASE_URI',
  'SUPPLY',
])

const shaderToRarityMap = {
  'Circuit Board': 'Ultra',
  Holographic: 'Ultra',
  Silver: 'Original',
  Gold: 'Rare',
  Purple: 'Mythic',
}

async function main() {
  for (let i = 0; i < SUPPLY; ++i) {
    const issueNumberString = `${i}`.padStart(4, '0000')

    // @ts-ignore
    const shader = boxShaderMap[issueNumberString]
    // @ts-ignore
    const rarity = shaderToRarityMap[shader]

    const meta = {
      aifa_boxset_id: issueNumberString,
      image: `${META_BACKEND_BASE_URI}/img/${i}.png`,
      animation_url: `${META_BACKEND_BASE_URI}/html/${i}.html`,
      attributes: [{ trait_type: 'Rarity', value: rarity }],
      description: null,
      name: `ASM AIFA Genesis #${issueNumberString}`,
      owner: null,
      tokenId: i,
    }

    await fs.promises.writeFile(
      `./s3_asset_bucket/meta/${i}`,
      JSON.stringify(meta, null, 2)
    )
  }
}

main()
