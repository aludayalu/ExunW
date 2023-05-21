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
    var cards=[]
    var temp_cards=[]
    var card_index=-1
    data.matches.result.map((x)=>{
        console.log(card_index)
        card_index+=1
        var event_key=x.event_key
        var team1=x.event_home_team
        var team1=team1.split(" ")
        if (team1.length>1) {
            team1=team1[0]+" "+team1[1]
        } else {
            team1=team1[0]
        }
        var team2=x.event_away_team
        var team2=team2.split(" ")
        if (team2.length>1) {
            team2=team2[0]+" "+team2[1]
        } else {
            team2=team2[0]
        }
        var team1logo=x.event_home_team_logo
        var team2logo=x.event_away_team_logo
        var card_id=card_index
        function check_search() {
            try {
                if (JSON.stringify(x).toLowerCase().includes(document.getElementById("search").value.toLowerCase())===false) {
                    document.getElementById(JSON.stringify(x)).style.border="none"
                } else {
                    document.getElementById(JSON.stringify(x)).style.border=""
                    console.log("not")
                }
            } catch {

            }
            setTimeout(check_search,500)
        }
        setTimeout(check_search,500)
        temp_cards.push(<>
        <Card css={{ mw: "30vw","bgBlur":"#0f111466" }} variant="bordered" isHoverable isPressable className="shadow" onClick={()=>{
            router.push("/match?index="+card_id.toString())
        }} id={JSON.stringify(x)}>
            <div style={{margin:"2vw"}}>
            <Text h4 css={{textAlign:"center"}}>
                {team1} vs {team2}
            </Text>
            <Text css={{ color: "$accents8" }}>
                <Text>{team1} : {(x.event_home_final_result==="") ? "0" : x.event_home_final_result}</Text>
                <Text>{team2} : {(x.event_away_final_result==="") ? "0" : x.event_away_final_result}</Text>
                <Row>
                <Text>League Round :</Text>
                <Spacer x={0.5}></Spacer>
                <Text color="warning">{(x.league_round==="") ? "In-Progress" : x.league_round}</Text>
                </Row>
            </Text>
            </div>
        </Card>
        </>)
        if (temp_cards.length===3) {
            cards.push(temp_cards)
            temp_cards=[]
        }
    })
    if (temp_cards.length!==0) {
        cards.push(temp_cards)
        temp_cards=[]
    }
    return (<>
    <div className="hidden">
    {get_headers(session)}
    <Spacer></Spacer>
    <div className="vertical">
    <Text h1>Matches</Text>
    <Spacer></Spacer>
    <Input
        clearable
        underlined
        labelPlaceholder="Search"
        width="30vw"
        id="search"
    />
    </div>
    <div style={{"backgroundImage":"url(svg.png)"}}>
    {cards.map((x)=>{
        return (<>
        <Row css={{margin:"2vw"}}>
            {x[0]}
            <Spacer x={1.75}></Spacer>
            {x[1]}
            <Spacer x={1.75}></Spacer>
            {x[2]}
        </Row>
        </>)
    })}
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