import Link from 'next/link';
import { Container, Button, Image } from '@mantine/core';

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
          {text ? text : "Dropability"}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "center"
          }}>


          <Button
            component="a"
            styles={(theme) => ({
              root: {
                backgroundColor: '#FAFAFA',
                color: '#858585',
                height: "100px",
                width: "100px",
                padding: 0,
                boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",

                '&:hover': {
                  backgroundColor: '#FAFAFA',
                  boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.30)",
                },
              }
            })}>
            <Image withPlaceholder src="/MenuButton.svg"></Image>
          </Button>
        </div>
      </div >
    </div>
  );
}

export default TitleFrame;
