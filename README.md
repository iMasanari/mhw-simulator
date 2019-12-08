# MHW:ICEBORNE スキルシミュ

「モンスターハンターワールド：アイスボーン」のスキルシミュレーター


## 概要

線形計画法を使用したスキルシミュレーターです。

アルゴリズムは下記を参考にし、実装しています。  
http://nap.s3.xrea.com/lpsim-v3.pdf

データは、5chのスキルシミュレーター開発スレのものを使用しています。

上記の方々に感謝。


## 使い方

発動したいスキルを選び、下記のボタンを押してください。

- 検索: 指定したスキルが発動可能な装備を、防御力が高い順に10件検索します
- 追加スキル: 指定したスキルに追加で発動可能なスキルを検索します


## 開発

コードは GPLv3 ライセンスの元、Githubにて公開しています。  
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
