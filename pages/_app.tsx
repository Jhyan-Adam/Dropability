import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorSchemeProvider, ColorScheme, MantineProvider, Container } from '@mantine/core';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Dropability</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
            fontFamily: "Dosis, sans-serif",
            colors: {
              background: "#F5F5F5",
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}