import { NextResponse } from "next/server";
import { prisma } from "@/db"
import { addTodo } from "@/lib/db";

export async function GET(request: Request){
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
}

export async function POST(request: Request){
    const data = await request.json();
    const todo = await addTodo(data.message)
    return NextResponse.json("success");
}