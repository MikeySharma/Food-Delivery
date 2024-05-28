import { Metadata } from 'next';
import LoginPage from './LoginPage';

export default function Home() {
  return <LoginPage />;
}

export const metadata: Metadata = {
  title: 'Login',
};