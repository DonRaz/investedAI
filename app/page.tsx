import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en'); // or detect the user's language
  return null;
} 