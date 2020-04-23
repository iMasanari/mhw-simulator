## 概要

「モンスターハンターワールド：アイスボーン」のスキルシミュレーターです。  

アルゴリズムは下記を参考にし、実装しています。  
http://nap.s3.xrea.com/lpsim-v3.pdf


## 使い方

発動したいスキルを選び、下記のボタンを押してください。

- 検索: 指定したスキルが発動可能な装備を、防御力が高い順に10件検索します
- 追加スキル: 指定したスキルに追加で発動可能なスキルを検索します

また、覚醒武器のシリーズスキルにも対応しています。武器スロットから、スキル付き覚醒武器を選んでください。

### ガイラ武器について

マスター強化したガイラ武器（金色を含む）に、爛輝龍の真髄が付与されるそうなので、仮対応しました。武器スロットから、爛輝龍の真髄を選んでください。  
なお、とりいそぎの仮対応につき、以下の不具合があります。

- スキル付き覚醒武器選択時に 覚醒スキル: 自動 を選び検索すると、武器スキルに爛輝龍の真髄が選ばれることがある  
  （ムフェト武器では爛輝龍の真髄はつかない）

この症状が出た場合、覚醒スキルに自動以外のスキルを選択してください。


## 英語対応について / English support

右上の English ボタンから切り替えができます。現在、スキル名や防具名などでのフィルタには非対応です。

You can switch from the English button on the upper right. Currently, filters by skill name, armor name, etc. are not supported.

## 開発

コードは GPLv3 ライセンスの元、Github にて公開しています。  
イシューやプルリクをお待ちしています。

[![iMasanari/mhw-simulator - GitHub](https://gh-card.dev/repos/iMasanari/mhw-simulator.svg)](https://github.com/iMasanari/mhw-simulator)  
![github pages](https://github.com/iMasanari/mhw-simulator/workflows/github%20pages/badge.svg)

## 感謝

5ch スキルシミュレーター開発スレの皆様  
翻訳サポート: [mhvuze](https://github.com/mhvuze)様  
