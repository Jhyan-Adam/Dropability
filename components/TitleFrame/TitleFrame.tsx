import Link from 'next/link';
import { Container, Button } from '@mantine/core';

function TitleFrame({ text }) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "wrapContent",
        width: "100vw",
        backgroundColor: "",
      }}>
      <div
        style={{
          width: "100vw",
          height: "wrapContent",
          backgroundColor: "",
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
    </div>
  );
}

export default TitleFrame;
