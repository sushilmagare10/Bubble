import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");

  if (!userId) return NextResponse.json({ exists: false });

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  return NextResponse.json({ exists: !!user });
}
