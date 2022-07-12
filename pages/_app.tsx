import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, Container } from '@mantine/core';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Dropability</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          fontFamily: "Dosis, sans-serif",
        }}
      >
        <Component {...pageProps} />
        <Container
          className="TEST"
          style={{ marginTop: 10 }}
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            '&:hover': {
              backgroundColor: theme.colors.gray[1],
            },
          })}
        />
      </MantineProvider>
    </>
  );
}