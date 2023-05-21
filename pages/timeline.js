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
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import kkr from "../public/kkr.webp"

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
    const news=[
        {
            "date":"2012-13","title":"Kolkata Knight Riders","data":"Manvinder Bisla"
        },
        {
            "date":"2013-14","title":"Mumbai Indians","data":"Kieron Pollard"
        },
        {
            "date":"2014-15","title":"Kolkata Knight Riders","data":"Robin Uthappa"
        },
        {
            "date":"2015-16","title":"Mumbai Indians","data":"Rohit Sharma"
        },
        {
            "date":"2016-17","title":"Sunrisers Hyderabad","data":"David Warner"
        },
        {
            "date":"2017-18","title":"Mumbai Indians","data":"Kieron Pollard"
        },
        {
            "date":"2018-19","title":"Chennai Super Kings","data":"Kane Williamson"
        },
        {
            "date":"2019-20","title":"Mumbai Indians","data":"Quinton de Kock"
        },
        {
            "date":"2020-21","title":"Mumbai Indians","data":"Ishan Kishan"
        },
        {
            "date":"2021-22","title":"Chennai Super Kings","data":"Moeen Ali"
        },
        {
            "date":"2022-23","title":"Gujarat Titans","data":"Hardik Pandya"
        }
    ]
    return (<>
    <div className="hidden">
    {get_headers(session)}
    <Spacer></Spacer>
    <div className="vertical">
    <Text h1>Winner of IPL over the years</Text>
    </div>
    <Spacer></Spacer>
    <VerticalTimeline>
        {news.map((x)=>{
            return (
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#e48520', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #e48520' }}
                    date={x.date}
                    iconStyle={{ background: '#e48520' }}
                    icon={x.image}
                >
                    <h3 className="vertical-timeline-element-title">{x.title}</h3>
                    <p>
                    The MVP was {x.data}
                    </p>
                </VerticalTimelineElement>
            )
        })}
    </VerticalTimeline>
    {footer()}
    </div>
    </>)
}

export async function getServerSideProps(context) {
    return {
    props: {
        
    }
    }
}