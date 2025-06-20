import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h2 className="text-black">Welcome to Next.js!</h2>
      
      <Button variant="secondary">Subscribe</Button>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      
      <h1>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </h1>

    </main>
  );
}
