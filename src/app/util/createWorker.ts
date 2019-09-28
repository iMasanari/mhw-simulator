let _worker: Worker | undefined

export default () => {
  // 2重実行しないよう、前回のワーカーを終了させる
  // TODO: 実行が完了している場合、前回のものを使い回すようにする
  if (_worker) _worker.terminate()

  return _worker = new Worker('~/worker/index.ts')
}
