// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopKeywords from './pages/TopKeywords';
import TopAuthors from './pages/TopAuthors';
import ArticlesByDate from './pages/ArticlesByDate';
import ArticlesByWordCount from './pages/ArticlesByWordCount';
import ArticlesByLanguage from './pages/ArticlesByLanguage';
import ArticlesByCategory from './pages/ArticlesByCategory';
import RecentArticles from './pages/RecentArticles';
import ArticlesByKeyword from './pages/ArticlesByKeyword';
import Dashboard from './pages/Dashboard'; // Assuming you have a Dashboard component
import Layout from './components/layouts/Layout';

const App = () => (
  <Router>
    <Layout>
      <div className="app">
        <Routes>
          <Route path="/chart/top_keywords" element={<TopKeywords />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/chart/top_authors" element={<TopAuthors />} />
          <Route path="/chart/articles_by_date" element={<ArticlesByDate />} />
          <Route path="/chart/articles_by_word_count" element={<ArticlesByWordCount />} />
          <Route path="/chart/articles_by_language" element={<ArticlesByLanguage />} />
          <Route path="/chart/articles_by_classes" element={<ArticlesByCategory />} />
          <Route path="/chart/recent_articles" element={<RecentArticles />} />
          <Route path="/chart/articles_by_keyword/" element={<ArticlesByKeyword />} />
        </Routes>
      </div>
    </Layout>
  </Router>
);

export default App;
