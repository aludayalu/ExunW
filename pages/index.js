import {
  Text,
  Link,
  Navbar,
  Spacer,
  Divider,
  Button,
  Textarea,
  Input,
  Image,
  Loading,
  Row,
  Modal,
  Head,
  Card,
  Grid,
  Collapse,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { countdown, discord_page, error_page, footer, get_headers, loading_page } from "./base.js";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from 'swr'
import confetti from 'canvas-confetti';
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs"
import Lenis from '@studio-freight/lenis'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function get_stat(title,description) {
  return (<>
  <Card css={{ mw: "30vw",bgBlur: "#0f111466" }} isblurred="true" variant="bordered" isHoverable isPressable className="shadow" blur="true">
    <div style={{margin:"2vw"}}>
    <img
        alt="nextui logo"
        src="logo-blue.png"
        width="60px"
        height="60px"
        style={{borderRadius:"50%","float":"left"}}
      />
      <Spacer y={3.5} x={0}></Spacer>
      <Text h3 css={{ float:"left", fontSize:"30px" }}>
        {title}
      </Text>
        <Text css={{ color: "$accents8", float:"left", textAlign:"left" }}>
          {description}
        </Text>
    </div>
    </Card>
  </>)
}

export default function Home(props) {
    var process=props.env
    const router = useRouter();
    var params = router.query;
    const { data: session } = useSession();
    const lenis = new Lenis()
    lenis.on('scroll', (e) => {
      console.log(e)
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    // "https://api.cricapi.com/v1/matches?apikey=bb402b53-a137-4be7-8a94-ff2b94e59f33&offset=0"
    var { data, error } = useSWR("http://localhost:3000/api/token", fetcher);if (!data) return loading_page()
    return (<>
    <div className="hidden">
    {get_headers(session)}
    <Spacer y={9.5}></Spacer>
    <div className="vertical">
    <Text h1>SportsGres v1.0</Text>
    <Text h1>Analytics and Statistics 📈</Text>
    <Text h3>Real Time Match Data and Voting On-Chain</Text>
    <div>
    <Spacer y={2}></Spacer>
    <Row className="wrapper">
      <Button className="shadow glow neow-button" onClick={()=>{
        router.push("/matches")
      }}>Get Started</Button>
    </Row>
    <Row className="wrapper">
      <Button className="glow2 neon-button">Get Started</Button>
    </Row>
    </div>
    <Spacer y={6}></Spacer>
    <BsChevronDown></BsChevronDown>
    </div>
    <div className="vertical">
    <Text h1>Why SportsGres?</Text>
    <Spacer></Spacer>
    <div style={{"margin":"1vw",backgroundImage:"url(svg.png)"}}>
    <Row>
      {get_stat("Realtime Data and Statistics","SportsGres provides real time data about IPL matches pulled from trusted sources for accurate researches.")}
      <Spacer x={2.5}></Spacer>
      {get_stat("Friendly UI and Dashboards","Sportsgres provides data in a presentable and user friendly by presenting data as charts, tables and graphs.")}
      <Spacer x={2.5}></Spacer>
      {get_stat("Free to use","Most features and services of SportsGres which are available online are free to use for singed up users.")}
    </Row>
    <Spacer y={2}></Spacer>
    <Row>
      {get_stat("On-Chain Voting","SportsGres makes voting for MVP's of the match decentralized and transparent on the LTZ-Chain.")}
      <Spacer x={2.5}></Spacer>
      {get_stat("Chat Rooms","SportsGres allows users to discuss match statistics and opinions inside of secure rooms with profanity filters.")}
      <Spacer x={2.5}></Spacer>
      {get_stat("Exclusive Merchandise","As the Official Sponsors of the IPL we provide our users with exclusive access to signed merchandise.")}
    </Row>
    <Spacer y={2}></Spacer>
    </div>
    <div style={{margin:"2vw","marginTop":"none"}}>
    <Collapse.Group>
    <Collapse title="Is SportsGres safe to use?" css={{ textAlign:"left" }}>
    <Text>SportsGres being the official sponsor of IPL assures users of their safety and privacy of their data. All communications are encrypted and all servers are carefully monitored for suspicious activity. SportsGres does not share any of its data with any other organisation.</Text>
    </Collapse>
    <Collapse title="What blockchain does SportsGres use?" css={{ textAlign:"left" }}>
      SportsGres uses LTZ-Chain for the votings and statistics. LTZ-Chain provides a Highly Scalable, Developer Friendly, Ever Expanding Ecosystes and Economically Feasible platform for voting and other tasks. LTZ-Chain is lightning fast with a TPS of 250,000+ and fees less than a 1000th of a penny. LTZ-Chain is the fastest PoW blockchain which supports smart contracts.
    </Collapse>
    <Collapse title="How authentic is the merchandise?" css={{ textAlign:"left" }}>
      SportsGres provides merchandise from the official partners of IPL for merchandise and cosmetics in order to provide our users with one of the best and finest clothing and goodies. We perform quality checks on our goods before listing them or delivering them to our customers.
    </Collapse>
    </Collapse.Group>
    </div>
    {footer()}
    </div>
    </div>
    </>)
}

export async function getServerSideProps(context) {
    return {
    props: {
      
    }
    }
}