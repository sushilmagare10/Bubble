import Feed from "@/components/Feed/Feed";
import Stories from "@/components/Stories/Stories";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import Image from "next/image";
import AddPost from "@/components/CreatePost/AddPost";

export default function Home() {
  return (
    <main className="flex justify-between gap-6 pt-6 ">
      <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
        <LeftSidebar type="home" />
      </aside>
      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-8">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </section>
      <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
        <RightSidebar />
      </aside>
    </main>
  );
}
