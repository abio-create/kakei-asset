---
description: 開発サーバーの起動方法
---

// turbo-all

1. Node.jsのPATHを設定して開発サーバーを起動:
```
$nodePath = "C:\Users\ユーザー\AppData\Roaming\fnm\node-versions\v24.13.1\installation"; $env:PATH = "$nodePath;" + $env:PATH; Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev
```
