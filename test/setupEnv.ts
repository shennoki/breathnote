import { loadEnvConfig } from '@next/env'

// Jest環境で環境変数を利用可能にする
export default async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd())
}
