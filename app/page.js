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
      <p className="text-gray-500">
        This is a simple Next.js application to demonstrate the use of components and styles.
      </p>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <p className="text-gray-500">
        Explore the code in the <code>app/page.js</code> file to see how it works.
      </p>
      <div className="mt-4">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
        />
      </div>

    </main>
  );
}
