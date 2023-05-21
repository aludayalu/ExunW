import Head from "next/head";
import {
  Text,
  Navbar,
  Spacer,
  Divider,
  Image,
  Button,
  Loading,
  Row,
  Link
} from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import FlipCountdown from '@rumess/react-flip-countdown';

export function get_headers(signedIn) {
  const router=useRouter()
  return (
    <>
      <Head>
        <title>SportsGres</title>
        <link rel="icon" type="image/x-icon" href="/logo-blue.png"></link>
        <meta name="viewport" content="width=device-width, initial-scale=0.4, maximum-scale=0.4,minimum-scale=0.4"/>
      </Head>
      <div
        style={{
          backgroundColor: "black",
          marginTop: "5px",
          boxShadow: "none",
        }}
      >
        <Navbar
          variant="floating"
        >
          <Navbar.Brand>
            <Image
              src="logo-blue.png"
              css={{ height: "7vh", borderRadius: "1vh" }}
              onClick={()=>{
                router.push("/")
              }}
            ></Image>
            <Spacer x={1.5}></Spacer>
            <Text h2 color={"$primary"} style={{ marginTop: "5px" }}>
              SportsGres
            </Text>
          </Navbar.Brand>
          <Navbar.Content activeColor="" css={{scale:1.1}}>
            <Navbar.Link onPress={()=>{
              router.push("/")
            }}>
              Home
            </Navbar.Link>
            {(()=>{
              if (signedIn) {
                return (<>
                <Navbar.Link onPress={()=>{
                  router.push("/matches")
                }}>Matches</Navbar.Link>
                <Navbar.Link onPress={()=>{
                  router.push("/marketplace")
                }}>Marketplace</Navbar.Link>
                <Navbar.Link onPress={()=>{
                  router.push("/timeline")
                }}>Timeline</Navbar.Link>
                <Navbar.Link onPress={signOut}>Logout</Navbar.Link>
                </>)
              } else {
                return (<>
                <Navbar.Link onPress={()=>{signIn("google")}}>Login</Navbar.Link>
                </>)
              }
            })()}
          </Navbar.Content>
        </Navbar>
      </div>
    </>
  );
}

export function footer() {
  return (
    <>
      <Spacer></Spacer>
      <div className="footer" style={{ width: "100vw", color: "grey" }}>
        <Divider></Divider>
        <Spacer></Spacer>
        <div className="vertical3">
          © SportsGres 2023
          <br></br>
          Doofenshmirtz Co.
          <Spacer></Spacer>
        </div>
      </div>
    </>
  );
}

export function error_page(data) {
  const router=useRouter()
  return (
    <>
      {get_headers()}
      <Spacer y={14}></Spacer>
      <div className="div vertical">
        <Text h1 color="red">
          {data}
        </Text>
      </div>
      <Spacer y={2}></Spacer>
      <div className="wrapper">
        <Spacer></Spacer>
        <Button
          css={{ scale: 1.5 }}
          onClick={() => {
            router.push("/")
          }}
        >
          Go to home page
        </Button>
        <Spacer></Spacer>
      </div>
      <Spacer y={15}></Spacer>
      {footer()}
    </>
  );
}

export function loading_page() {
  return (
    <>
    <div className="div_center hidden">
      <Row>
      <img src="logo-blue.png" style={{height:"200px",width:"200px","border-radius":"1vh"}}></img>
      </Row>
      <Spacer></Spacer>
      <Row>
      <div className="div vertical">
        <Loading></Loading>
      </div>
      </Row>
    </div>
    </>
  )
}

export default function Home1() {
  return <>{/* nothing */}</>;
}