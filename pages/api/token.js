import { getToken } from "next-auth/jwt"
import axios from "axios"

export default async (req, res) => {
    var params = req.query
    var practice_level_id=params.practice_level_id
    const session = await getToken({ req })
    if (session) {
        res.status(200).json({
            auth:true,
            "matches":(await axios.get("https://apiv2.api-cricket.com/?method=get_livescore&APIkey=76abe668f5d9062c178c775c3f4d41e4d8b2641a14d494a6de7c77e89bb6f7a6")).data
        })
    }
    else {
    res.status(200).json({"auth":false})
    }
    res.end()
}