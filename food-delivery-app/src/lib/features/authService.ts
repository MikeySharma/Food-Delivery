import axios from "axios";

export const login = async (data: {
    email: string;
    password: string;
}) => {
    try {
        console.log(data);
        const response = await axios.post('/api/auth/login', data);
        return response.data;
    } catch (error: any) {
        console.error(error);
    }
}