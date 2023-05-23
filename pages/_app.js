import "../styles/globals.css";
import { NextUIProvider, Row, Loading, Spacer } from "@nextui-org/react";
import Head from "next/head";
import { createTheme } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from "react";
import { loading_page } from "./base";
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      background: "black",
      text: "#fff",
      // you can also create your own color
      myDarkColor: "#e48520",
      // ...  more colors
      primary: "#e48520",
    },
    space: {},
    fonts: {},
  },
});

function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setloading] = useState(true);
  useEffect(()=>{
    setloading(false)
  })
  if (!loading) {
  return (
    <>
    <NextNProgress color="#e48520" />
    <NextUIProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
    </>
  );
  }
  return (
    <>
    <Head>
        <title>Sportsgres</title>
        <link rel="icon" type="image/x-icon" href="/logo-blue.png"></link>
    </Head>
    <div style={{backgroundColor:"black"}} className="hidden">
      <div className="div_center" style={{backgroundColor:"black","width":"100%","height":"100%"}}>
      <Row>
      <div className="div vertical">
      <img src="logo-blue.png" style={{height:"200px",width:"200px","border-radius":"1vh","marginTop":"180%"}}></img>
      </div>
      </Row>
      <Spacer></Spacer>
      <Row>
      <div className="div vertical">
        <Loading></Loading>
      </div>
      </Row>
    </div>
    </div>
    </>
  )
}

export default App;
