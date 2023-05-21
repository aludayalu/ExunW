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
    Table
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { countdown, discord_page, error_page, footer, get_headers, loading_page } from "./base.js";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from 'swr'
import confetti from 'canvas-confetti';
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs"
import { Chart } from "react-google-charts";
import * as SendButton from "./sendButton";
import { SendIcon } from "./SendIcon";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home(props) {
    var process=props.env
    const [last_press, setlastpress] = React.useState(0);
    const router = useRouter();
    var params = router.query;
    const { data: session } = useSession();
      // "https://api.cricapi.com/v1/matches?apikey=bb402b53-a137-4be7-8a94-ff2b94e59f33&offset=0"
    var { data, error } = useSWR("http://localhost:3000/api/token", fetcher);if (!data) return loading_page()
    var match=data.matches.result[params.index]
    var last_fetch=[]
    function on_click() {
        if (document.getElementById("text").value!=="") {
            axios.get("http://127.0.0.1/add_room?room="+match.event_home_team+"vs"+match.event_away_team+"&data="+document.getElementById("text").value)
            document.getElementById("text").value=""
        }
    }
    async function get_chats() {
            clearTimeout(timeout)
            try {
                var chats=(await axios.get("http://127.0.0.1/get_room?room="+match.event_home_team+"vs"+match.event_away_team)).data
            if (chats!=last_fetch) {
                document.getElementById("container").scrollTop=1000000
            }
            document.getElementById("container").innerHTML=""
            chats.map((x)=>{
                document.getElementById("msg").innerText=x
                var childclass=document.getElementById("msg").cloneNode(true)
                childclass.style.display="block"
                childclass.style.textAlign="left"
                childclass.style.float="left"
                document.getElementById("container").appendChild(childclass)
                var childclass=document.getElementById("spacer").cloneNode(true)
                childclass.style.display="block"
                document.getElementById("container").appendChild(childclass)
                
            })
            document.getElementsByClassName("nextui-c-kqJcCN")[0].id="send_btn"
            document.getElementsByClassName("nextui-c-kqJcCN")[0].onclick=on_click
            } catch {

            }
            timeout=setTimeout(get_chats,1000)
    }
    var timeout=setTimeout(get_chats,1000)
    return (<>
    <div className="hidden">
    {get_headers(session)}
    <div className="vertical">
    <Text h1 color="$primary">{match.event_home_team} vs {match.event_away_team}</Text>
    </div>
    <div style={{backgroundImage:"url(svg.png)"}}>
    <div style={{margin:"2vw"}}>
    <div style={{"minHeight":"40vw","maxHeight":"40vw","border":"1px solid grey","borderRadius":"30px","overflow-y":"auto","bgBlur":"#0f111466"}}>
        <Button id="msg" css={{display:"none"}}>
            Aarav : Hello
        </Button>
        <div id="spacer" style={{ "display":"none" }}>
        <br></br><br></br>
        </div>
        <div style={{ margin:"1vw" }} id="container">
            
        </div>
    </div>
    </div>
    <div className="vertical">
    <Input
        clearable
        contentRightStyling={false}
        placeholder="Type your message..."
        contentRight={
        <SendButton.SendButton>
            <SendIcon />
        </SendButton.SendButton>
        }
        width="70vw"
        id="text"
    />
    </div>
    {footer()}
    </div>
    </div>
    {(()=>{
        setTimeout(()=>{
            function on_key_up(e) {
                if (e.code==="Enter" && (((Date.now()/1000)-last_press) > 1)) {
                setlastpress((Date.now()/1000))
                try {
                    setTimeout(()=>{
                    on_click()
                    },100)
                } catch {return}
                }
            }
            document.addEventListener("keyup",on_key_up)
        },500)
    })()}
    </>)
}

export async function getServerSideProps(context) {
    return {
    props: {
        
    }
    }
}