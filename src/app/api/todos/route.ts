import { NextResponse } from "next/server";
import { prisma } from "@/db"
import { addTodo } from "@/lib/db";

export async function GET(request: Request){
    const todos = await prisma.todo.findMany();
    if(!todos) return NextResponse.json({"message": "Failed"}, {status: 404});
    return NextResponse.json(todos, {status: 200})
}

export async function POST(request: Request){
    const data = await request.json();
    const todo = await addTodo(data.message)
    if(!todo) return NextResponse.json({"message": "Failed"}, {status: 404});
    return NextResponse.json(todo, {status: 200})
}