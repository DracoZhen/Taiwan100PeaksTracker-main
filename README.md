# 台灣百岳登山紀錄助手 (Taiwan 100 Peaks Tracker)

<div align="center">
  <!-- 請將此處替換為實際的專案截圖 -->
  <img src="https://via.placeholder.com/1200x600?text=Taiwan+100+Peaks+Tracker" alt="Taiwan 100 Peaks Tracker Banner" width="100%" />
</div>

一個專為台灣登山愛好者設計的百岳紀錄與視覺化工具。透過互動式地圖與成就系統，記錄您的百岳攀登旅程。

## ✨ 主要功能

- **⛰️ 百岳清單管理**：完整的台灣百岳資料庫，包含高度、難度分級與位置資訊。
- **🗺️ 互動式地圖**：視覺化呈現百岳位置，已攀登與未攀登的山峰一目了然。
- **🏆 成就系統**：根據攀登數量解鎖不同等級稱號（如：初出茅廬、百岳戰神）。
- **💾 自動儲存**：攀登紀錄自動儲存於瀏覽器 LocalStorage，無需登入即可保存進度。
- **🔍 快速搜尋與篩選**：支援依山名、山系（如：玉山山脈、雪山山脈）進行篩選。

## 🛠️ 技術架構

本專案使用現代化前端技術構建：

- **核心框架**: React 19 + TypeScript
- **建置工具**: Vite
- **樣式庫**: TailwindCSS
- **地圖套件**: Leaflet + React-Leaflet
- **圖表呈現**: Recharts

## 🚀 快速開始

### 前置需求
- [Node.js](https://nodejs.org/) (建議使用 LTS 版本)

### 安裝與執行

1. **複製專案**
   ```bash
   git clone https://github.com/DracoZhen/Taiwan100PeaksTracker.git
   cd Taiwan100PeaksTracker
   ```

2. **安裝套件**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   開啟瀏覽器訪問 `http://localhost:3000` 即可開始使用。

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request 來協助改進這個專案！

## 📄 授權

此專案採用 MIT License。
