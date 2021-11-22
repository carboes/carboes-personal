import dotenv from 'dotenv'

dotenv.config()

interface Options {
  print: boolean
}

export function getEnv<E>(requiredEnvKeys: string[], options?: Options): E {
  const missingEnvVars = requiredEnvKeys.reduce(
    (accumulator: string[], key: string): string[] => {
      if (!process.env[key]) {
        return [...accumulator, key]
      }

      return accumulator
    },
    []
  )
  if (missingEnvVars.length > 0) {
    throw Error(
      `Required environment variables are missing -> ${missingEnvVars.join(
        ', '
      )}`
    )
  }

  if (options && options.print) {
    console.log('ENVIRONMENT VARIABLES ---')
    requiredEnvKeys.forEach((key) => {
      console.log(`${key}: ${process.env[key]}`)
    })
    console.log('-------------------------')
  }

  return process.env as unknown as E // ! TODO this is a bit of a type hack, we could rework this util to be a codec ✨
}
