# Task 2: Web Scraping API

This project provides a FastAPI-based API for querying articles stored in a MongoDB database. The API includes various endpoints to retrieve articles based on different criteria such as word count, keyword count, publication date, and more.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Top Keywords](#top-keywords)
  - [Top Authors](#top-authors)
  - [Articles by Date](#articles-by-date)
  - [Articles by Word Count](#articles-by-word-count)
  - [Articles by Language](#articles-by-language)
  - [Articles by Classes](#articles-by-classes)
  - [Recent Articles](#recent-articles)
  - [Articles by Keyword](#articles-by-keyword)
  - [Articles by Author](#articles-by-author)
  - [Top Classes](#top-classes)
  - [Article Details](#article-details)
  - [Articles with Video](#articles-with-video)
  - [Articles by Year](#articles-by-year)
  - [Longest Articles](#longest-articles)
  - [Shortest Articles](#shortest-articles)
  - [Articles by Keyword Count](#articles-by-keyword-count)
  - [Articles with Thumbnail](#articles-with-thumbnail)
  - [Articles Updated After Publication](#articles-updated-after-publication)
  - [Articles by Coverage](#articles-by-coverage)
  - [Popular Keywords Last X Days](#popular-keywords-last-x-days)
  - [Articles by Month](#articles-by-month)
  - [Articles by Word Count Range](#articles-by-word-count-range)
  - [Articles with Specific Keyword Count](#articles-with-specific-keyword-count)
  - [Articles by Specific Date](#articles-by-specific-date)
  - [Articles Containing Specific Text](#articles-containing-specific-text)
  - [Articles with More Than Specific Word Count](#articles-with-more-than-specific-word-count)
  - [Articles Grouped by Coverage](#articles-grouped-by-coverage)
  - [Articles Last X Hours](#articles-last-x-hours)
  - [Articles by Title Length](#articles-by-title-length)
  - [Most Updated Articles](#most-updated-articles)
- [Usage](#usage)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/FOURDE1/Data-science.git
    cd Task2
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On macOS/Linux
    ```

3. Install the required dependencies:
    ```bash
    pip install fastapi uvicorn pymongo
    ```

4. Set up the MongoDB database and create necessary indexes. The database setup is handled in the `database.py` file located in the project directory.

5. Run the FastAPI application:
    ```bash
    uvicorn main:app --reload
    ```

## Endpoints

### Top Keywords
- **Endpoint**: `/top_keywords`
- **Description**: Returns the top keywords used in articles.
- **Method**: GET

### Top Authors
- **Endpoint**: `/top_authors`
- **Description**: Returns the top authors of articles.
- **Method**: GET

### Articles by Date
- **Endpoint**: `/articles_by_date`
- **Description**: Returns articles grouped by their publication date.
- **Method**: GET

### Articles by Word Count
- **Endpoint**: `/articles_by_word_count`
- **Description**: Returns articles grouped by their word count.
- **Method**: GET

### Articles by Language
- **Endpoint**: `/articles_by_language`
- **Description**: Returns articles grouped by their language.
- **Method**: GET

### Articles by Classes
- **Endpoint**: `/articles_by_classes`
- **Description**: Returns articles grouped by their classes.
- **Method**: GET

### Recent Articles
- **Endpoint**: `/recent_articles`
- **Description**: Returns the most recent articles.
- **Method**: GET

### Articles by Keyword
- **Endpoint**: `/articles_by_keyword/{keyword}`
- **Description**: Returns articles that contain a specific keyword.
- **Method**: GET

### Articles by Author
- **Endpoint**: `/articles_by_author/{author_name}`
- **Description**: Returns articles written by a specific author.
- **Method**: GET

### Top Classes
- **Endpoint**: `/top_classes`
- **Description**: Returns the top classes of articles.
- **Method**: GET

### Article Details
- **Endpoint**: `/article_details/{postid}`
- **Description**: Returns the details of a specific article.
- **Method**: GET

### Articles with Video
- **Endpoint**: `/articles_with_video`
- **Description**: Returns articles that contain a video.
- **Method**: GET

### Articles by Year
- **Endpoint**: `/articles_by_year/{year}`
- **Description**: Returns articles published in a specific year.
- **Method**: GET

### Longest Articles
- **Endpoint**: `/longest_articles`
- **Description**: Returns a list of the longest articles by word count.
- **Method**: GET

### Shortest Articles
- **Endpoint**: `/shortest_articles`
- **Description**: Returns a list of the shortest articles by word count.
- **Method**: GET

### Articles by Keyword Count
- **Endpoint**: `/articles_by_keyword_count`
- **Description**: Returns articles grouped by the number of keywords they contain.
- **Method**: GET

### Articles with Thumbnail
- **Endpoint**: `/articles_with_thumbnail`
- **Description**: Returns a list of articles that have a thumbnail image.
- **Method**: GET

### Articles Updated After Publication
- **Endpoint**: `/articles_updated_after_publication`
- **Description**: Returns a list of articles where the last_updated time is after the published_time.
- **Method**: GET

### Articles by Coverage
- **Endpoint**: `/articles_by_coverage/{coverage}`
- **Description**: Returns articles grouped by their coverage.
- **Method**: GET

### Popular Keywords Last X Days
- **Endpoint**: `/popular_keywords_last_x_days/{days}`
- **Description**: Returns the most popular keywords used in articles over the last X days.
- **Method**: GET

### Articles by Month
- **Endpoint**: `/articles_by_month/{year}/{month}`
- **Description**: Returns articles published in a specific month of a specific year.
- **Method**: GET

### Articles by Word Count Range
- **Endpoint**: `/articles_by_word_count_range/{min_count}/{max_count}`
- **Description**: Returns the count of articles whose word count falls within a specified range.
- **Method**: GET

### Articles with Specific Keyword Count
- **Endpoint**: `/articles_with_specific_keyword_count/{count}`
- **Description**: Returns articles that contain exactly a specified number of keywords.
- **Method**: GET

### Articles by Specific Date
- **Endpoint**: `/articles_by_specific_date/{date}`
- **Description**: Returns articles published on a specific date.
- **Method**: GET

### Articles Containing Specific Text
- **Endpoint**: `/articles_containing_text/{text}`
- **Description**: Returns a list of articles that contain a specific text within their content.
- **Method**: GET

### Articles with More Than Specific Word Count
- **Endpoint**: `/articles_with_more_than/{word_count}`
- **Description**: Returns articles with more than a specified word count.
- **Method**: GET

### Articles Grouped by Coverage
- **Endpoint**: `/articles_grouped_by_coverage`
- **Description**: Returns articles grouped by their coverage.
- **Method**: GET

### Articles Last X Hours
- **Endpoint**: `/articles_last_x_hours/{hours}`
- **Description**: Returns articles published in the last X hours.
- **Method**: GET

### Articles by Title Length
- **Endpoint**: `/articles_by_title_length`
- **Description**: Returns articles grouped by the length of their title.
- **Method**: GET

### Most Updated Articles
- **Endpoint**: `/most_updated_articles`
- **Description**: Returns the most updated articles.
- **Method**: GET

## Usage

1. Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

2. Open your browser and navigate to `http://127.0.0.1:8000/docs` to access the interactive API documentation provided by Swagger UI.

3. Use the provided endpoints to query the articles based on different criteria.
