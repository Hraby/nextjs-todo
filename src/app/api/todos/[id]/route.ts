import { NextResponse } from "next/server";
import { prisma } from "@/db"
import { delTodo, getTodo } from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const todo = await delTodo(parseInt(params.id))
    if(!todo) return NextResponse.json({"message": "Failed"}, {status: 404});
    return NextResponse.json({status: 204})
}

export async function GET(request: Request, { params }: { params: { id: string } }){
    const todo = await getTodo(parseInt(params.id))
    if(!todo) return NextResponse.json({"message": "Failed"}, {status: 404});
    return NextResponse.json(todo, {status: 200})
}