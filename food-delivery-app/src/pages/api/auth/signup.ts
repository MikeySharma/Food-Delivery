import dbConnect from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/User";

type ResData = {
    success: boolean;
    message?: string;
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await dbConnect();
    if (method != 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`)
    }
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, error: 'Parameter not found' } as ResData);
        }
        const user = await User.findOne({ email });
        console.log(user);
        if (user || user != null) {
            return res.status(400).json({ success: false, error: 'Email Already Registered' });
        }
        await User.create({
            email,
            password,
            name,
        })
        console.log(user);
        res.status(201).json({ success: true, message: 'Account Registered Successfully' });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server Error' })
    }
}