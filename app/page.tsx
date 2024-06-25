import Feed from "@/components/Feed/Feed";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-6 pt-6 ">
      <aside className="hidden md:block xl:w-[20%] h-screen">
        <LeftSidebar />
      </aside>
      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col">
          <Feed />
        </div>
      </section>
      <aside className="hidden lg:block w-[30%]">
        <RightSidebar />
      </aside>
    </main>
  );
}
