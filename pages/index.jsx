
import { ActionIcon, Button, Image, Text, Container } from '@mantine/core';
//import MenuButton from "../public"
import TitleFrame from "../components/TitleFrame/TitleFrame";


export default function HomePage() {

  function Title() {
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
            <Text
              style={{
                fontFamily: "Dosis, normal",
                fontStyle: "normal",
                fontWeight: "",
                fontSize: "200%",
                height: "wrapContent",
                width: "wrapContent",
                color: "#858585",
              }}>
              Tap to Search
            </Text>
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
                  width: "80px",
                  height: "80px",
                  background: "#1CE3CB",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.25)",
                }}>

              </Button>
            </div>
          </div>
      </>
    );
  }

  function MainContentWindow() {
    return (
      <div
        style={{
          backgroundColor: "#000000"
        }}>
      </div>
    )
  }

  return (
    <Title />
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

