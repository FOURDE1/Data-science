import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Css/SideNav.css';

const SideNav = () => {
  const location = useLocation();

  return (
    <div className="sidenav">
      <div className="logo">
        <img className="logo-img" src="/logo.png" alt="Al Mayadeen Logo" />
      </div>
      <ul>
        {[
          { to: "/chart/top_keywords", text: "Top Keywords" },
          { to: "/chart/top_authors", text: "Top Authors" },
          { to: "/chart/articles_by_date", text: "Articles by Date" },
          { to: "/chart/articles_by_word_count", text: "Articles by Word Count" },
          { to: "/chart/articles_by_language", text: "Articles by Language" },
          { to: "/chart/articles_by_classes", text: "Articles by Classes" },
          { to: "/chart/recent_articles", text: "Recent Articles" },
          { to: "/chart/articles_by_keyword", text: "Articles by Keyword" },
          { to: "/chart/articles_by_author", text: "Articles by Author" },
          { to: "/chart/top_classes", text: "Top Classes" },
          { to: "/chart/article_details", text: "Article Details" },
          { to: "/chart/articles_with_video", text: "Articles with Video" },
          { to: "/chart/articles_by_year", text: "Articles by Year" },
          { to: "/chart/longest_articles", text: "Longest Articles" },
          { to: "/chart/shortest_articles", text: "Shortest Articles" },
          { to: "/chart/articles_by_keyword_count", text: "Articles by Keyword Count" },
          { to: "/chart/articles_with_thumbnail", text: "Articles with Thumbnail" },
          { to: "/chart/articles_updated_after_publication", text: "Articles Updated After Publication" },
          { to: "/chart/articles_by_coverage", text: "Articles by Coverage" },
          { to: "/chart/popular_keywords_last_x_days", text: "Popular Keywords Last X Days" },
          { to: "/chart/articles_by_month", text: "Articles by Month" },
          { to: "/chart/articles_by_word_count_range", text: "Articles by Word Count Range" },
          { to: "/chart/articles_with_specific_keyword_count", text: "Articles with Specific Keyword Count" },
          { to: "/chart/articles_by_specific_date", text: "Articles by Specific Date" },
          { to: "/chart/articles_containing_text", text: "Articles Containing Specific Text" },
          { to: "/chart/articles_with_more_than", text: "Articles with More Than Specific Word Count" },
          { to: "/chart/articles_grouped_by_coverage", text: "Articles Grouped by Coverage" },
          { to: "/chart/articles_last_x_hours", text: "Articles Published in Last 24 Hours" },
          { to: "/chart/articles_by_title_length", text: "Articles by Length of Title" },
          { to: "/chart/most_updated_articles", text: "Most Updated Articles" }
        ].map((item) => (
          <li key={item.to} className={location.pathname === item.to ? 'active' : ''}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
