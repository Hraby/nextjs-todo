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
    if(todo) return null;
}

export async function editTodo(todoId: string, todoText: string){
    const todo = await prisma.todo.update({
        where: {
            id: parseInt(todoId)
        },
        data: {
            message: todoText,
        },
    });
    if(todo) return null;
}