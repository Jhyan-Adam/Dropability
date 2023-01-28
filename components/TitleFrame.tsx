import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Paper, Button, Image, Drawer, Text } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';

function TitleFrame({ text }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
        padding="xl"
        size="md"
        position="right"
        overlayOpacity={0.08}
        overlayBlur={1.5}
        transitionDuration={120}
        transitionTimingFunction="ease"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
          }}>
          <Link href="/">
            <Button size="xl" variant="subtle"
              sx={(theme) => ({
                width: "100%",
                color: "#858585",
                '&:hover': {
                  backgroundColor: theme.colorScheme === "light" ? "#F4F4F4" : theme.colors.gray[9],
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                },
              })}>
              <Text
                sx={{
                  fontSize: "120%",
                  letterSpacing: "0.15em",
                }}>
                HOME
              </Text>
            </Button>
          </Link>

          <Link href="/about">
            <Button size="xl" variant="subtle"
              sx={(theme) => ({
                width: "100%",
                color: "#858585",
                '&:hover': {
                  backgroundColor: theme.colorScheme === "light" ? "#F4F4F4" : theme.colors.gray[9],
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                },
              })}>
              <Text
                sx={{
                  fontSize: "120%",
                  letterSpacing: "0.15em",
                }}>
                ABOUT
              </Text>
            </Button>
          </Link>

          <Link href="/generalChart">
            <Button size="xl" variant="subtle"
              sx={(theme) => ({
                width: "100%",
                color: "#858585",
                '&:hover': {
                  backgroundColor: theme.colorScheme === "light" ? "#F4F4F4" : theme.colors.gray[9],
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                },
              })}>
              <Text
                sx={{
                  fontSize: "120%",
                  letterSpacing: "0.15em",
                }}>
                GENERAL CHART
              </Text>
            </Button>
          </Link>
        </div>

      </Drawer>
      <Paper
        sx={(theme) => ({
          height: "fit-content",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colorScheme === "light" ? "#FFFFFF" : theme.colors.dark[6],
          padding: 0,
        })}>
        <div
          style={{
            height: "100%",
            width: "100%",
            flex: "0 1 auto",
            order: "0",
            alignSelf: "stretch",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyContent: "center",
            padding: "1%",
          }}>
          <ColorSchemeToggle />
          <Text
            sx={{
              fontSize: "300%",
              color: "cornflowerblue",
              fontStyle: "normal",
              fontWeight: "200",
              lineHeight: "0",
              letterSpacing: "0.15em",
              alignSelf: "center",
              textAlign: "center",
              gridColumn: "2",
            }}>
            {text ? text : "Dropability"}
          </Text>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              //backgroundColor: "black",
            }}>
            <Button
              component="a"
              styles={(theme) => ({
                root: {
                  alignSelf: "center",
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FAFAFA',
                  color: '#858585',
                  //Fix sizing for mobile
                  height: "fit-content",
                  width: "fit-content",
                  padding: "4%",
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",

                  '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FAFAFA',
                    boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.30)",
                  },
                }
              })}
              onClick={() => setOpened(true)}>
              <Image src="/MenuBars.svg" width="48px" align="center" />
            </Button>
          </div>
        </div >
      </Paper >
    </>
  );
}

export default TitleFrame;
