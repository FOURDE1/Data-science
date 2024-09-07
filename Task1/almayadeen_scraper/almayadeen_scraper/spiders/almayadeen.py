import scrapy
from scrapy import Request
from datetime import datetime
from ..items import ArticleItem
import json
import logging

class AlmayadeenSpider(scrapy.Spider):
    name = "almayadeen"
    allowed_domains = ["almayadeen.net"]
    start_urls = ["https://www.almayadeen.net/sitemaps/all.xml"]

    def parse(self, response):
        self.logger.info(f"Parsing main sitemap: {response.url}")

        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        sitemaps = response.xpath('//s:sitemap/s:loc/text()', namespaces=ns).getall()
        self.logger.info(f"Found {len(sitemaps)} monthly sitemaps.")

        for sitemap_url in sitemaps:
            self.logger.info(f"Processing monthly sitemap: {sitemap_url}")
            yield Request(url=sitemap_url, callback=self.parse_monthly_sitemap)

    def parse_monthly_sitemap(self, response):
        self.logger.info(f"Parsing monthly sitemap: {response.url}")

        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        article_urls = response.xpath('//s:url/s:loc/text()', namespaces=ns).getall()
        self.logger.info(f"Found {len(article_urls)} article URLs in monthly sitemap.")

        for article_url in article_urls:
            self.logger.info(f"Processing article URL: {article_url}")
            yield Request(url=article_url, callback=self.parse_article)

    def parse_article(self, response):
        self.logger.info(f"Parsing article: {response.url}")


        script_content = response.xpath('//script[@id="tawsiyat-metadata"]/text()').get()
        if script_content:
            data = json.loads(script_content)


            if 'word_count' in data and data['word_count']:
                data['word_count'] = int(data['word_count'])
            if 'published_time' in data and data['published_time']:
                data['published_time'] = datetime.fromisoformat(data['published_time'].replace('Z', '+00:00'))
            if 'last_updated' in data and data['last_updated']:
                data['last_updated'] = datetime.fromisoformat(data['last_updated'].replace('Z', '+00:00'))

            
            item = ArticleItem(
                type=data.get('type'),
                postid=data.get('postid'),
                title=data.get('title'),
                url=data.get('url'),
                keywords=data.get('keywords'),
                thumbnail=data.get('thumbnail'),
                video_duration=data.get('video_duration'),
                word_count=data.get('word_count'),
                lang=data.get('lang'),
                published_time=data.get('published_time'),
                last_updated=data.get('last_updated'),
                description=data.get('description'),
                author=data.get('author'),
                classes=data.get('classes'),
                html=data.get('html'),
                lite_url=data.get('lite_url')
            )

            self.logger.info(f"Scraped item: {item}")
            yield item
