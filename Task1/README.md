# Al Mayadeen Web Scraper

## Overview

This project is designed to scrape articles from the Al Mayadeen website. The scraper extracts relevant metadata and full content from articles and saves the data into JSON files, organized by month. The goal is to efficiently gather comprehensive article information for further analysis.

## Requirements

- **Python 3.x**: Ensure Python is installed on your system.
- **Scrapy**: A powerful web scraping framework for Python.

## Project Structure

- **`web_scraper.py`**: The main Scrapy spider script.
- **`items.py`**: Defines the data structure for scraped items.
- **`settings.py`**: Configuration settings for the Scrapy project.
- **`output/`**: Directory where JSON files will be saved.

## Installation and Setup

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/FOURDE1/Data-science.git
   cd Task1
   ```

2. **Create a Virtual Environment**

   Create and activate a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**

   Install the required Python packages:

   ```bash
   pip install scrapy
   ```

## Usage

To run the spider and start scraping:

```bash
cd almayadeen_scaper
scrapy crawl almayadeen
```

## How It Works

1. **Spider Initialization**

   The spider starts by making a request to the main sitemap URL: `https://www.almayadeen.net/sitemaps/all.xml`.

2. **Parsing Sitemaps**

   The `parse` method retrieves monthly sitemap URLs from the main sitemap and delegates the parsing of these URLs to the `parse_monthly_sitemap` method.

3. **Extracting Article URLs**

   For each monthly sitemap, the `parse_monthly_sitemap` method extracts article URLs and sends requests to these URLs for further scraping.

4. **Scraping Articles**

   The `parse_article` method extracts metadata from the `<script>` tag with `id="tawsiyat-metadata"`, including fields such as `postid`, `title`, `keywords`, `thumbnail`, `published_time`, `last_updated`, `description`, `author`, `word_count`, `lang`, and `classes`. It also captures the full article text from `<p>` tags.

5. **Saving Data**

   The scraped data is saved into JSON files named by year and month in the `output/` directory. Each file will contain up to 10,000 articles.

## Configuration

You can adjust settings in `settings.py` to configure aspects such as request delays, user agents, or logging levels.

## Troubleshooting

- **No Data Scraped**: Ensure that the XPath expressions in `parse_article` match the structure of the webpage. Verify that the website's HTML structure has not changed.
- **Errors or Exceptions**: Check the Scrapy logs for detailed error messages. Adjust the logging level in `settings.py` if needed.

## Contributing

If you have suggestions or improvements for this project, please open an issue or submit a pull request.

---

Feel free to reach out if you have any questions or need further assistance!
