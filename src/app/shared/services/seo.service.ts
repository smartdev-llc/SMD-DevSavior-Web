import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      title: 'Devsavior',
      description: '',
      image: './assets/images/banner.jpg',
      slug: '',
      url: 'https://devsavior.com',
      imageWidth: 200,
      imageHeight: 200,
      ...config
    }

    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ name: 'twitter:card', content: 'job' });
    this.meta.updateTag({ name: 'twitter:site', content: 'JuniorViec' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:site_name', content: 'JuniorViec' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:image:width', content: config.imageWidth });
    this.meta.updateTag({ property: 'og:image:height', content: config.imageHeight });
    this.meta.updateTag({ property: 'og:image:secure_url', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `${config.url}${config.slug}` });
  }
}
