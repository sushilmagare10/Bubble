// app/friends/page.tsx

import Friends from '@/components/Friends'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFollowRequests, getMyFriends } from '@/lib/actions/getMyFriends'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const FriendsPage = async () => {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Fetch data on the server side
  const [myFriends, followRequests] = await Promise.all([
    getMyFriends(),
    getFollowRequests()
  ])

  return (
    <main className="flex gap-6  pt-6 min-h-screen">
      <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
        <LeftSidebar type="profile" />
      </aside>

      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-card/50 border border-border/70 rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Friends</h1>
            
            <Tabs defaultValue="friends" className="w-full ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="friends">My Friends ({myFriends.length})</TabsTrigger>
                <TabsTrigger value="requests">Requests ({followRequests.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="friends" className="mt-6">
                <Friends 
                  initialFriends={myFriends}
                  showTabs={false}
                />
              </TabsContent>
              
              <TabsContent value="requests" className="mt-6">
                <Friends 
                  showTabs={false}
                  showRequestsOnly={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
        <RightSidebar />
      </aside>
    </main>
  )
}

export default FriendsPage