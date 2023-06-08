import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  const description = "Chirp away in this Twitter clone!";
  const title = "Chirp";
  const imageMetaURL = "https://chirp-larasify.vercel.app/bird.png";

  
  return (
    <ClerkProvider {...pageProps}>
      <Head>
      <title>Chirp</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/turtle.svg" />


        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />


        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/bird.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/bird.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/bird.png"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/turtle.svg" />
        <meta
          name="apple-mobile-web-app-title"
          content="Chirp"
        />
        <meta
          name="application-name"
          content="Chirp"
        />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
