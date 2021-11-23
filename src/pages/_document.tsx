import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (pageProps) => sheet.collectStyles(<App {...pageProps} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="shortcut icon" href="/icons/icon-48x48.png?v=1" />
          <link
            rel="apple-touch-icon"
            sizes="48x48"
            href="/icons/icon-48x48.png?v=1"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/icon-72x72.png?v=1"
          />
          <link
            rel="apple-touch-icon"
            sizes="96x96"
            href="/icons/icon-96x96.png?v=1"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/icon-144x144.png?v=1"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192x192.png?v=1"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/icon-512x512.png?v=1"
          /> */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
									page_path: window.location.pathname,
								});
							`,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
