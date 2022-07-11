import Link from 'next/link';
import { ActionIcon, Button, Image } from '@mantine/core';
//import MenuButton from "../public"
//import TitleFrame from "../components/TitleFrame";


export default function HomePage() {

  function Title() {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyContent: "center",
          padding: "1%",
          width: "fill-container",
          height: "wrap-content",
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
                  //color: '#858585',
                  border: 0,
                  height: "wrapContent",
                  width: "wrapContent",
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
        <image />
      </div >
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
    <Title/>
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

