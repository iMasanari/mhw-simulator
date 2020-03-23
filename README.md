![github pages](https://github.com/iMasanari/mhw-simulator/workflows/github%20pages/badge.svg)

# MHW:ICEBORNE スキルシミュ

「モンスターハンターワールド：アイスボーン」のスキルシミュレーター


## 概要

線形計画法を使用したスキルシミュレーターです。

アルゴリズムは下記を参考にし、実装しています。  
http://nap.s3.xrea.com/lpsim-v3.pdf

データは、5ch のスキルシミュレーター開発スレのものを使用しています。

上記の方々に感謝。


## 使い方

発動したいスキルを選び、下記のボタンを押してください。

- 検索: 指定したスキルが発動可能な装備を、防御力が高い順に10件検索します
- 追加スキル: 指定したスキルに追加で発動可能なスキルを検索します

また、覚醒武器のシリーズスキルにも対応しています。武器スロットから、スキル付き覚醒武器を選んでください。


## 英語対応について / English support

右上の English ボタンから切り替えができます。現在、スキル名や防具名などでのフィルタには非対応です。

You can switch from the English button on the upper right. Currently, filters by skill name, armor name, etc. are not supported.

## 開発

コードは GPLv3 ライセンスの元、Github にて公開しています。  
イシューやプルリクをお待ちしています。

Github: [iMasanari/mhw-simulator](https://github.com/iMasanari/mhw-simulator)

### 構成

- Node.js / npm
- TypeScript
- React / Redux

### 実行

```bash
npm install
npm run dev
```


## 感謝

5ch スキルシミュレーター開発スレの皆様  
翻訳サポート: [mhvuze](https://github.com/mhvuze)様  
