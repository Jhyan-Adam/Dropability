
import { ActionIcon, Button, Image, Text, Container } from '@mantine/core';
//import MenuButton from "../public"
import TitleFrame from "../components/TitleFrame";
import SearchBar from "../components/SearchBar";


export default function HomePage() {

  function LandingPage() {
    return (
      <>
        <TitleFrame/>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              gap: "10px",
            }}>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 60px 60px",
              gap: "50px",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "50px"
              }}>
              <Button
                style={{
                  width: "500px",
                  height: "100px",
                  background: "#1CE3CB",
                  borderRadius: "14px",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                }}>
                  <Image withPlaceholder src='/MinecraftTitle.png' alt="Minecraft" width={250}/>
              </Button>
            </div>
          </div>
      </>
    );
  }

  return (
    <LandingPage />
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

