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
    const [visible, setVisible] = React.useState(false);
    const [players, setplayers] = React.useState([]);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
      // "https://api.cricapi.com/v1/matches?apikey=bb402b53-a137-4be7-8a94-ff2b94e59f33&offset=0"
    var { data, error } = useSWR("https://exun-w.vercel.app/api/token", fetcher);if (!data) return loading_page()
    var match=data.matches.result[params.index]
    function get_innings(inner_name,inner_key,match) {
        var pie_data=[["Player","Runs"]]
        return (<>
            <Text h2 color="$primary">{inner_name}</Text>
            <Table
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            >
            <Table.Header>
                <Table.Column>NAME</Table.Column>
                <Table.Column>TYPE</Table.Column>
                <Table.Column>RUNS</Table.Column>
                <Table.Column>BALLS</Table.Column>
                <Table.Column>4's</Table.Column>
                <Table.Column>6's</Table.Column>
            </Table.Header>
            <Table.Body>
            {match.scorecard[inner_key].map((x)=>{
                pie_data.push([x.player,Number(x.R)])
                return (
                <Table.Row>
                    <Table.Cell>
                        <Link css={{color:"white"}} onClick={()=>{
                            setplayers([x.player])
                            handler()
                        }}>{x.player}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        {x.type}
                    </Table.Cell>
                    <Table.Cell>
                        {x.R}
                    </Table.Cell>
                    <Table.Cell>
                        {x.B}
                    </Table.Cell>
                    <Table.Cell>
                    {x["4s"]}
                    </Table.Cell>
                    <Table.Cell>
                        {x["6s"]}
                    </Table.Cell>
                </Table.Row>
                )
            })}
            </Table.Body>
            </Table>
            <Text h2 color="$primary">Wickets</Text>
            <Table
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            >
            <Table.Header>
                <Table.Column>BOWLER</Table.Column>
                <Table.Column>FALL</Table.Column>
            </Table.Header>
            <Table.Body>
            {(()=>{
                if (match.wickets[inner_key]===undefined) {
                    match.wickets[inner_key]=[]
                }
            })()}
            {match.wickets[inner_key].reverse().map((x)=>{
                pie_data.push([x.player,Number(x.R)])
                return (
                <Table.Row>
                    <Table.Cell>
                        {x.balwer}
                    </Table.Cell>
                    <Table.Cell>
                        {x.fall}
                    </Table.Cell>
                </Table.Row>
                )
            })}
            </Table.Body>
            </Table>
            <Spacer y={2}></Spacer>
            <div className="vertical">
            <Text h1>Run contribution</Text>
            </div>
            <Chart
            chartType="PieChart"
            data={pie_data}
            options={{title:"Runs",is3D:true,backgroundColor:"none",legend: {
                textStyle: {
                    color:"white"
                }
            }}}
            width={"100%"}
            height={"400px"}
            className="chart"
            ></Chart>
            </>)
        }
    return (<>
    <div className="hidden">
    {get_headers(session)}
    <div className="vertical">
    <Text h1 color="$primary">{match.event_home_team} vs {match.event_away_team}</Text>
    <Text h2>{(match.event_home_final_result==="") ? "0" : match.event_home_final_result} - {(match.event_away_final_result==="") ? "0" : match.event_away_final_result}</Text>
    <div className="wrapper">
    <Button className="shadow"
    onClick={()=>{
        window.location="/discuss?index="+params.index.toString()
    }}
    >Discuss</Button><Spacer></Spacer>
    </div>
    </div>
    <div style={{margin:"5vw"}}>
        <Row>
        <Text h3 color="$primary">Toss : </Text> <Spacer></Spacer>
        <Text h3>{match.event_toss}</Text>
        </Row>
        <Row>
        <Text h3 color="$primary">Stadium : </Text> <Spacer></Spacer>
        <Text h3>{match.event_stadium}</Text>
        </Row>
        <Row>
        <Text h3 color="$primary">League : </Text> <Spacer></Spacer>
        <Text h3>{match.league_name}</Text>
        </Row>
        <Text h1 color="$primary">Innings</Text>
        {(()=>{
            var keys=[]
            Object.keys(match.scorecard).forEach((x)=>{
                return keys.push(get_innings(x,x,match))
            })
            return keys
        })()}
    </div>
    {footer()}
    </div>
    <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="50vw"
        css={{bgBlur:"#0f111466","border":"1px solid grey"}}
    >
        <Spacer></Spacer>
        <Text h3>Do you want to vote {players[0]} as the MVP of the match?</Text>
        <Spacer y={1}></Spacer>
        <div className="wrapper">
        <Button css={{width:"20vw"}} id={players[0]} onClick={()=>{
            document.getElementById(players[0]).style.backgroundColor="green"
            var timeout=setTimeout(()=>{
                clearTimeout(timeout)
                document.getElementById(players[0]).style.backgroundColor=""
                closeHandler()
            },500)
        }}>Vote for {players[0]}</Button>
        </div>
        <Spacer y={2}></Spacer>
    </Modal>
    </>)
}

export async function getServerSideProps(context) {
    return {
    props: {
        
    }
    }
}