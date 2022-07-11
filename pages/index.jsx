import Link from 'next/link';
import { ActionIcon, Button, Image, Text } from '@mantine/core';
//import MenuButton from "../public"
//import TitleFrame from "../components/TitleFrame";


export default function HomePage() {

  function Title() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            background: "#F8F8F8",
          }}>
          <div
            style={{
              width: "100vw",
              height: "wrapContent",
              backgroundColor: "#FFFFFF",
              flex: "none",
              order: "0",
              alignSelf: "stretch",
              flexGrow: "0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              justifyContent: "center",
              padding: "1%",
            }}>
            <h1
              style={{
                fontSize: "300%",
                color: "cornflowerblue",
                fontStyle: "normal",
                fontWeight: "200",
                lineHeight: "0",
                letterSpacing: "0.15em",
                textAlign: "center",
                gridColumn: "2",
              }}>
              Dropability
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignSelf: "center"
              }}>
              <Link href="" passHref>
                <Button
                  component="a"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: '#FAFAFA',
                      color: '#858585',
                      border: 0,
                      height: "wrapContent",
                      width: "wrapContent",
                      //padding: "1%",
                      paddingLeft: 30,
                      paddingRight: 30,
                      paddingTop: 30,
                      paddingBottom: 30,
                      boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",

                      '&:hover': {
                        backgroundColor: theme.fn.darken('#FAFAFA', 0.05),
                      },
                    }
                  })}>
                </Button>
              </Link>
            </div>
          </div >
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
                fontFamily: "Dosis, sans-serif",
                fontWeight: 400,
                fontSize: "200%",
                height: "wrapContent",
                width: "wrapContent",
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

