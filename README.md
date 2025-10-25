# 📰 News Feed App

A modern, stylish React-based news feed application that fetches and displays live news articles using the GNews API. Built with React, Vite, and Tailwind CSS for a fast and responsive user experience.

## ✨ Features

- 🎨 Modern UI with Tailwind CSS for beautiful, responsive design
- 📱 Fully responsive layout that works on all devices
- 🔄 Real-time news updates with refresh functionality
- 🖼️ Article cards with images and fallback UI
- 📅 Publication dates and source information
- 🔗 Direct links to full articles
- ⚡ Blazing fast performance with Vite
- 🎭 Smooth animations and interactive elements
- 🔍 Search functionality for finding specific news
- 🌐 Multiple news categories
- 🌙 Dark/Light mode support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- GNews API key (free tier available from [GNews](https://gnews.io/))

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Create a `.env` file in the root directory and add your GNews API key:
   ```env
   VITE_GNEWS_API_KEY=your_api_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:5173`

4. To create a production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🛠️ Technologies Used

- ⚛️ React 18
- 🎨 Tailwind CSS
- ⚡ Vite
- 🔄 Axios for API requests
- 📱 React Icons
- 🌟 React Toastify for notifications
- 🎬 Framer Motion for animations
- 🔍 React Query for data fetching

## 🌐 API Reference

This app uses the [GNews API](https://gnews.io/) to fetch news articles. Sign up for a free API key to get started.

## 📄 License

This project is licensed under the MIT License.