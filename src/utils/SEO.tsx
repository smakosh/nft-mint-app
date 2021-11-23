import nextSEOConfig from 'config/next-seo.config';
import { NextSeo } from 'next-seo';

export interface SeoProps {
  url?: string;
  title?: string;
  description?: string;
  cover?: string | null;
}

const SEO = ({ url, title, description, cover }: SeoProps) => {
  const APP_NAME = 'Mintify';
  const CLIENT_URL = 'https://mintify.smakosh.com';

  return (
    <NextSeo
      title={title ? `${title} | ${APP_NAME}` : APP_NAME}
      description={description || nextSEOConfig.description}
      additionalMetaTags={[
        {
          name: 'image',
          content: cover || `${CLIENT_URL}/cover.jpeg`,
        },
        {
          property: 'og:title',
          content: title || APP_NAME,
        },
        {
          property: 'og:description',
          content: description || nextSEOConfig.description,
        },
        {
          property: 'og:url',
          content: `${CLIENT_URL}${url}`,
        },
        {
          property: 'og:image',
          content: cover || `${CLIENT_URL}/cover.jpeg`,
        },
        {
          name: 'twitter:url',
          content: `${CLIENT_URL}${url}`,
        },
        {
          name: 'twitter:title',
          content: title || nextSEOConfig.openGraph.site_name,
        },
        {
          name: 'twitter:description',
          content: description || nextSEOConfig.description,
        },
        {
          name: 'twitter:image:src',
          content: cover || `${CLIENT_URL}/cover.jpeg`,
        },
        {
          name: 'twitter:image',
          content: cover || `${CLIENT_URL}/cover.jpeg`,
        },
      ]}
    />
  );
};

export default SEO;
