
import React from 'react';
import { Link } from 'react-router-dom';
import './Css/SideNav.css';

const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="logo">
        <img className="logo-img" src="/logo.png" alt="Al Mayadeen Logo" />
      </div>
      <ul>
        <li><Link to="/chart/top_keywords">Top Keywords</Link></li>
        <li><Link to="/chart/top_authors">Top Authors</Link></li>
        <li><Link to="/chart/articles_by_date">Articles by Date</Link></li>
        <li><Link to="/chart/articles_by_word_count">Articles by Word Count</Link></li>
        <li><Link to="/chart/articles_by_language">Articles by Language</Link></li>
        <li><Link to="/chart/articles_by_classes">Articles by Classes</Link></li>
        <li><Link to="/chart/recent_articles">Recent Articles</Link></li>
        <li><Link to="/chart/articles_by_keyword">Articles by Keyword</Link></li>
        <li><Link to="/chart/articles_by_author">Articles by Author</Link></li>
        <li><Link to="/chart/top_classes">Top Classes</Link></li>
        <li><Link to="/chart/article_details">Article Details</Link></li>
        <li><Link to="/chart/articles_with_video">Articles with Video</Link></li>
        <li><Link to="/chart/articles_by_year">Articles by Year</Link></li>
        <li><Link to="/chart/longest_articles">Longest Articles</Link></li>
        <li><Link to="/chart/shortest_articles">Shortest Articles</Link></li>
        <li><Link to="/chart/articles_by_keyword_count">Articles by Keyword Count</Link></li>
        <li><Link to="/chart/articles_with_thumbnail">Articles with Thumbnail</Link></li>
        <li><Link to="/chart/articles_updated_after_publication">Articles Updated After Publication</Link></li>
        <li><Link to="/chart/articles_by_coverage">Articles by Coverage</Link></li>
        <li><Link to="/chart/popular_keywords_last_x_days">Popular Keywords Last X Days</Link></li>
        <li><Link to="/chart/articles_by_month">Articles by Month</Link></li>
        <li><Link to="/chart/articles_by_word_count_range">Articles by Word Count Range</Link></li>
        <li><Link to="/chart/articles_with_specific_keyword_count">Articles with Specific Keyword Count</Link></li>
        <li><Link to="/chart/articles_by_specific_date">Articles by Specific Date</Link></li>
        <li><Link to="/chart/articles_containing_text">Articles Containing Specific Text</Link></li>
        <li><Link to="/chart/articles_with_more_than">Articles with More Than Specific Word Count</Link></li>
        <li><Link to="/chart/articles_grouped_by_coverage">Articles Grouped by Coverage</Link></li>
        <li><Link to="/chart/articles_last_x_hours">Articles Published in Last 24 Hours</Link></li>
        <li><Link to="/chart/articles_by_title_length">Articles by Length of Title</Link></li>
        <li><Link to="/chart/most_updated_articles">Most Updated Articles</Link></li>
      </ul>
    </div>
  );
};

export default SideNav;
