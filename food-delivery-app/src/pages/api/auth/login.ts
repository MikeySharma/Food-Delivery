'user server'
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '../../../../models/User';
type Data = {
    success: boolean;
    message?: string;
    error?: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ success: false, error: 'Please Provide  email and password' } as Data)
                }
                const user = await User.findOne({ email }).select('+password');
                if (!user) {
                    return res.status(400).json({ success: false, error: 'Invalid credentials' } as Data);
                }

                const isMatch = await user.matchPassword(password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, error: 'Invalid Credentials' } as Data);
                }
                res.status(200).json({ success: true, message: 'Logged in successfully' } as Data)
            } catch (error: any) {
                res.status(500).json({ success: false, error: 'Server error' } as Data);
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}