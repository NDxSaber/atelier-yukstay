import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import socialBg from '../../assets/yukstay-bg.jpg';
import { buildProtocolUrl } from '../../helper'

import config from '../../config';

const SITE_URL = buildProtocolUrl(config.site.URL);

const defaultTitle = 'YukStay';
const defaultDescription =
  'Cari kostan dan apartemen murah atau co-living? Tinggal di Co-living Jakarta, apartemen murah seharga kostan hanya di YukStay';
const defaultKeywords = 'YukStay, co-living, info kos, cari kos, apartemen murah, sewa apartemen, cari apartemen, kamar kost, kostan, kos, co-living Indonesia, co-living Jakarta, info co-living.';
const defaultImage = `${SITE_URL}${socialBg}`;
const defaultSep = ' | ';

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      keywords,
      image,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags
    },
    pathname
  ) {
    const theTitle = title
      ? (title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle;
    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription;
      const theKeywords = keywords
      ? keywords.substring(0, 155)
      : defaultKeywords;
    const theImage = image ? image : defaultImage;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      { name: 'keywords', content: theKeywords },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:image', content: theImage },
      { property: 'og:description', content: theDescription },
      { property: 'og:site_name', content: defaultTitle },
      // { property: 'fb:app_id', content: FACEBOOK_APP_ID }
    ];

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  }

  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
          }}
          title={
            rest.title ? rest.title : defaultTitle
          }
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname
            }
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        {children}
      </div>
    );
  }
}

export default withRouter(Page);
