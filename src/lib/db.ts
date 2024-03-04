import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function addTodo(todoText: string){
    const todo = await prisma.todo.create({
        data: {
          message: todoText.toString()
        },
    });
    if(!todo) return null;
    return todo;
}

export async function delTodo(todoId: number){
    const todo = await prisma.todo.delete({
        where: {
            id: todoId
        },
    });
    if(!todo) return null;
    return todo;
}

export async function editTodo(todoId: number, todoText: string){
    const todo = await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            message: todoText,
        },
    });
    if(!todo) return null;
    return todo;
}

export async function getTodos(){
    const todos = await prisma.todo.findMany({})
    if(!todos) return null;
    return todos;
}

export async function getTodo(todoId: number){
    const todo = await prisma.todo.findFirst({
        where: {
            id: todoId
        },
    });
    if(!todo) return null;
    return todo;
}

export async function setStatusTodo(todoId: number, todoStatus: string){
    const todo = await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            status: todoStatus == "off" ? "on" : "off"
        }
    });
    if(!todo) return null;
    return todo;
}