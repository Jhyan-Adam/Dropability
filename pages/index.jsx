
import { ActionIcon, Button, Image, Text, Paper } from '@mantine/core';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import TitleFrame from "../components/TitleFrame";


export default function HomePage() {

  function LandingPage() {
    return (
      <>
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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3430353182515812"
            crossorigin="anonymous"></script>
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
                  width: "500px",
                  //Fix sizing for mobile
                  height: "fit-content",
                  padding: "2%",
                  background: "#1CE3CB",
                  borderRadius: "14px",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                }}>
                <Image src='/MinecraftTitle.png' alt="Minecraft" width={250} />
              </Button>
            </Link>
            <Button
              style={{
                width: "500px",
                height: "100px",
                background: "#1CE3CB",
                borderRadius: "14px",
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
              }}>
              <Text sx={(theme) => ({ fontSize: "60px", color: theme.colors.gray[6] })}>Button 2</Text>
            </Button>
          </div>
        </Paper>
      </>
    );
  }

  return (
    <LandingPage />
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

