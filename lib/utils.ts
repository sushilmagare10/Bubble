import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Pusher from "pusher";
import PusherClient from "pusher-js";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'ap2',
  useTLS: true,
});

export default pusherServer;

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "ap2",
  }
);