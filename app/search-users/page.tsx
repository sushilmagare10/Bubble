import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import SearchUsers from '@/components/SearchUsers'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const SearchUsersPage = async () => {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <main className="flex gap-6 pt-6 min-h-screen">
      <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
        <LeftSidebar type="profile" />
      </aside>

      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-card/50 border border-border/70 rounded-xl shadow-sm">
            <SearchUsers />
          </div>
        </div>
      </section>

      <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
        <RightSidebar />
      </aside>
    </main>
  )
}

export default SearchUsersPage