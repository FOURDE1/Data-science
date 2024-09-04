import scrapy
import json
from scrapy.http import Request

class AlmayadeenSpider(scrapy.Spider):
    name = 'almayadeen'
    allowed_domains = ['almayadeen.net']
    start_urls = ['https://www.almayadeen.net/sitemaps/all.xml']  # el link l asesye

    def parse(self, response):
       # 3m shuf shu lmskli l2n ma ken 3m ys7b
        self.logger.info(f"Parsing main sitemap: {response.url}")

        # tl3t lmshkli enu lzm 7ded el name space
        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

        # hun 3m b3mmil extract lal month sitemap
        sitemaps = response.xpath('//s:sitemap/s:loc/text()', namespaces=ns).getall()
        self.logger.info(f"Found {len(sitemaps)} monthly sitemaps.")

        for sitemap_url in sitemaps:
            # kmen debbuging
            self.logger.info(f"Processing monthly sitemap: {sitemap_url}")
            # b3d ma ytl3 l sitemap y3ml request 3le la yjib el links le b2lbow el data b3dyn
            yield Request(url=sitemap_url, callback=self.parse_monthly_sitemap)

    def parse_monthly_sitemap(self, response):
        # debbging
        self.logger.info(f"Parsing monthly sitemap: {response.url}")

        # nm space
        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

        article_urls = response.xpath('//s:url/s:loc/text()', namespaces=ns).getall()
        self.logger.info(f"Found {len(article_urls)} article URLs in monthly sitemap.")

        for article_url in article_urls:
            self.logger.info(f"Processing article URL: {article_url}")
            yield Request(url=article_url, callback=self.parse_article)

    def parse_article(self, response):
        self.logger.info(f"Parsing article: {response.url}")

        metadata_script = response.xpath('//script[@id="tawsiyat-metadata"]/text()').get()
        if metadata_script:
            self.logger.info("Metadata script found, extracting data.")

            try:
                metadata = json.loads(metadata_script)
            except json.JSONDecodeError as e:
                self.logger.error(f"Error decoding JSON: {e}")
                return

            item = {
                'postid': metadata.get('postid'),
                'title': metadata.get('title'),
                'url': metadata.get('url'),
                'keywords': metadata.get('keywords'),
                'thumbnail': metadata.get('thumbnail'),
                'published_time': metadata.get('published_time'),
                'last_updated': metadata.get('last_updated'),
                'description': metadata.get('description'),
                'author': metadata.get('author'),
                'word_count': metadata.get('word_count'),
                'lang': metadata.get('lang'),
                'classes': metadata.get('classes'),
                'content': ''.join(response.xpath('//p/text()').getall()),  # hun 3m jeb kol text
            }

            self.logger.info(f"Article data extracted: {item['title']}")
            yield item  # mtl el return la yrj3lna item w y7to f file
        else:
            self.logger.warning("Metadata script not found on the page.")
