import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Preload des polices critiques */}
          <link
            rel="preload"
            href="/_next/static/media/627d916fd739a539-s.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Autres polices */}
          <link
            rel="preload"
            href="/_next/static/media/your-other-font.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 