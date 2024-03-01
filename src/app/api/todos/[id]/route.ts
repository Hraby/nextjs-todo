import { NextResponse } from "next/server";
import { prisma } from "@/db"
import { delTodo } from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const todo = await delTodo(params.id)
    if(!todo) return NextResponse.json("failed");
    return NextResponse.json("success");
}