

export default function TitleFrame({ text }) {

  return (
    <>
      <div>
        <h1
          style={{
            fontSize: "60px",
            color: "cornflowerblue",
            fontStyle: "normal",
            fontWeight: "200",
            lineHeight: "100px",
            letterSpacing: "0.15em",
          }}>
          {text}
        </h1>
      </div>
    </>
  );
}
