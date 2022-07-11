import Link from 'next/link';
import { Center, Button, MantineProvider, Global } from '@mantine/core';

export default function HomePage() {

  function Header({ title }) {
    return (
    <div style={{backgroundColor: "#000000"}}>
      <Center>
        <h1 style={{fontFamily: "Dosis, sans-serif"}}>{title ? title : 'Default title'}</h1>;
      </Center>
    </div>
    );
  }

  function MenuButton() {
    return (

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
    );
  }

  
  return (
    <div>
      <Header title="Dropability" />

      <MenuButton/>
    </div>
  );

}

//const [likes, setLikes] = useState(0); <-- this is a state

