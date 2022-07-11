import Link from 'next/link';
import { Center, Button } from '@mantine/core';
//import TitleFrame from "../components/TitleFrame";


export default function HomePage() {

  function Title() {
    return (
    <div style={{backgroundColor: "#FAFAFA"}}>
      <h1 style={{
        fontSize: "60px", 
        color: "cornflowerblue",
        fontStyle: "normal",
        fontWeight: "200",
        lineHeight: "100px",
        letterSpacing: "0.15em",
        }}>Dropability</h1>

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
    );
  }

  function MainContentWindow() {
    return(
      <div style={{backgroundColor: "#000000"}}></div>
    )
  }
  
  return (
    <Title/>
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

