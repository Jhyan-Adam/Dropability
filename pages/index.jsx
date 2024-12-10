
import { ActionIcon, Button, Image, Text, Paper } from '@mantine/core';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import TitleFrame from "../components/TitleFrame";


export default function HomePage() {

  function LandingPage() {
    return (
      <>
        <script async
          data-adbreak-test="on"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3430353182515812"
          crossorigin="anonymous">
        </script>
        <Paper
          sx={(theme) => ({
            height: "100vh",
            width: "100%",
            display: "flex",
            flexFlow: "column",
            backgroundColor: theme.colorScheme == "light" ? theme.colors.background : theme.colors.dark[7],
            padding: 0,
          })}>
          <TitleFrame />

          {/*
          <ins class="adsbygoogle"
            style={{
              display: "inline-block",
              width: "336px",
              height: "280px"
            }}
            data-ad-client="ca-pub-3430353182515812"
            data-adtest="on"
            data-ad-slot="3430353182515812"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({ });
          </script>
          */}

          <div
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              gap: "50px",
              padding: "2%",
            }}>
            <Link href={"/items?game=minecraft"}>
              <Button
                style={{
                  maxWidth: "600px",
                  width: "fit-content",
                  height: "fit-content",
                  padding: "2% 3% 3% 3%",
                  background: "#1CE3CB",
                  borderRadius: "14px",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                }}>
                <Image src='/MinecraftTitle.png' alt="Minecraft" />
              </Button>
            </Link>
            <Button
              //Button width/height inconsistent because title pngs include transparent space when sizing
              style={{
                maxWidth: "600px",
                width: "fit-content",
                height: "fit-content",
                padding: "2% 3% 2% 3%",
                background: "#1CE3CB",
                borderRadius: "14px",
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                display: "none"
              }}>
              <Image src='/EldenRingTitle.png' alt="Elden Ring" />
            </Button>
            <Text
              style={{
                fontSize: "180%",
                lineHeight: "80%",
                textAlign: "center",
                color: "#858585"
              }}>
            That's all there is for now <br /><br /> ⬤‿⬤
          </Text>
        </div>
      </Paper >
      </>
    );
  }

  return (
    <LandingPage />
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

