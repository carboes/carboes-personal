import fs from 'fs'
import { getEnv } from './utils/env'
import boxShaderMap from './crate_rarity_map.json'
import _ from 'lodash'

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

    const template = await fs.promises.readFile('./template.html')
    const html = _.template('' + template)({
      htmlWebpackPlugin: {
        options: {
          title: `ASM AIFA Genesis #${issueNumberString}`,
          jsBundle: `${META_BACKEND_BASE_URI}/js/bundle.js`,
          glb: `${META_BACKEND_BASE_URI}/glb/${i}.glb`,
          shadertype: shader,
        },
      },
    })

    await fs.promises.writeFile(`./s3_asset_bucket/html/${i}.html`, html)
  }
}

main()
