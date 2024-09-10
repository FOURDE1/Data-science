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
import Dashboard from './pages/Dashboard';
import Layout from './components/layouts/Layout';
import ArticlesByAuthor from './pages/ArticlesByAuthor';
import TopClasses from './pages/TopClasses';
import ArticleDetails from './pages/ArticleDetails';
import ArticlesWithVideos from './pages/ArticlesWithVideos';

import LongestArticles from './pages/LongestArticles';
import ArticlesByYear from './pages/ArticlesByYear';

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
          <Route path="/chart/articles_by_keyword" element={<ArticlesByKeyword />} />
          <Route path="/chart/articles_by_author" element={<ArticlesByAuthor />} />
          <Route path="/chart/top_classes" element={<TopClasses />} />
          <Route path="/chart/article_details" element={<ArticleDetails />} />
          <Route path="/chart/articles_with_video" element={<ArticlesWithVideos />} />
          <Route path="/chart/articles_by_year" element={<ArticlesByYear />} />
          <Route path="/chart/longest_articles" element={<LongestArticles />} />

        </Routes>
      </div>
    </Layout>
  </Router>
);

export default App;
