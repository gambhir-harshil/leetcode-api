import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/db";
import { ResponseFuncs } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const catcher = (error: Error) => res.status(400).json({error})

    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { User } = await dbConnect()
            res.json(await User.find({}).catch(catcher))
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { User } = await dbConnect()
            res.json(await User.create(req.body).catch(catcher))
        }
    }

    const response = handleCase[method]
    if(response) response(req, res)
    else res.status(400).json({ error: "No response for this request" })
}

export default handler