import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`body { margin: 0 }`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
          <div îd="modal-portal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
