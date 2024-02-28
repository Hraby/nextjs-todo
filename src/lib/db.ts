import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function addTodo(todoText: string){
    const todo = await prisma.todo.create({
        data: {
          message: todoText.toString()
        },
    });
    if(todo) return {todo};
}

export async function delTodo(todoId: string){
    const todo = await prisma.todo.delete({
        where: {
            id: parseInt(todoId)
        },
    });
    if(todo) return {todo};
}