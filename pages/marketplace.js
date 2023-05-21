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
    Col
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

export const Card4 = (title,img) => {
    var padding_CSS={}
    if (img==="gloves.png") {
        padding_CSS={"padding":"5vh","padding-top":"7vh","padding-bottom":"1vh"}
    }
    if (img==="jersey.png") {
        padding_CSS={"padding":"5vh","padding-top":"7vh","padding-bottom":"1vh"}
    }
    if (img==="bat.png") {
        padding_CSS={"padding":"5vh","padding-top":"7vh","padding-bottom":"1vh"}
    }
    if (img==="grandprize.png") {
        padding_CSS={"padding":"5vh","padding-top":"3vh","padding-bottom":"0vh"}
    }
    return (
    <Card css={{ w: "30vw", "height":"50vh", "maxHeight":"50vh","bgBlur":"#0f111466" }} variant="bordered" className="shadow" isPressable isHoverable>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            New
            </Text>
            <Text h3 color="$primary">
            {title}
            </Text>
        </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
        <Card.Image
            src={img}
            width="90%"
            height="90%"
            objectFit="cover"
            alt="Card example background"
            css={padding_CSS}
        />
        </Card.Body>
        <Spacer y={3}></Spacer>
        <Card.Footer
        isBlurred
        css={{
            position: "absolute",
            bgBlur: "#0000",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
        }}
        >
        <Row>
            <Col>
            <Text color="#fff" size={12}>
                Available soon.
            </Text>
            <Text color="#fff" size={12}>
                Get notified.
            </Text>
            </Col>
            <Col>
            <Row justify="flex-end">
                <Button flat auto rounded css={{backgroundColor:"$primary"}} id={title+"btn"} onClick={()=>{
                    document.getElementById(title).style.color="white"
                    document.getElementById(title+"btn").style.backgroundColor="green"
                    document.getElementById(title).innerText="✅"
                    setTimeout(()=>{
                        document.getElementById(title).style.color="black"
                        document.getElementById(title+"btn").style.backgroundColor=""
                        document.getElementById(title).innerText="Notify Me"
                    },750)
                }}>
                <div id={title} style={{"color":"black","min-width":"4vw"}}>
                Notify Me
                </div>
                </Button>
            </Row>
            </Col>
        </Row>
        </Card.Footer>
    </Card>)
};


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
    var products=[
        {
            "title":"Grand Prize","img":"grandprize.png"
        },
        {
            "title":"Cap","img":"/cap.png"
        },
        {
            "title":"Boots","img":"/boots.png"
        },
        {
            "title":"Bag","img":"bag.png"
        },
        {
            "title":"Bottle","img":"bottle.png"
        },
        {
            "title":"Cup","img":"cup.png"
        },
        {
            "title":"Gloves","img":"gloves.png"
        },
        {
            "title":"Jersey","img":"jersey.png"
        },
        {
            "title":"Bat","img":"bat.png"
        }
    ]
    products.map((x)=>{
        temp_cards.push(Card4(x.title,x.img))
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
    <Text h1>Catalogue 🛍</Text>
    <Text h2>Pre-Order Our Merchandise!</Text>
    <Spacer></Spacer>
    </div>
        <div style={{margin:"2vw","backgroundImage":"url(svg.png)"}}>
        {cards.map((x)=>{
            return (<>
            <Row>
            {x[0]}
            <Spacer x={2}></Spacer>
            {x[1]}
            <Spacer x={2}></Spacer>
            {x[2]}
            </Row>
            <Spacer y={2}></Spacer>
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