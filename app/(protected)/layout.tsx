"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "sonner";


export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    axios.get('/api/me').then(()=>{
      setLoading(false);
    }).catch(()=>{
      router.push('/sign-in_page')
    })

  },[router])
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
