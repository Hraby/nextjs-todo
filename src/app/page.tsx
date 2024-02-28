import { prisma } from "@/db";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addTodo } from "@/lib/db";

async function fetchData(){
  const data = await fetch("http://localhost:3000/api/todos")
  return await data.json()
}

export default async function Home() {
  const data = await fetchData()

  async function createPost(formData: FormData){
    "use server"

    const todoText = formData.get("todoText")
    if (todoText) {
      const todo = await addTodo(todoText.toString())
      console.log(todo);
    }
    revalidatePath("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex justify-between py-4">
        <a href="/" className="font-bold">Todo</a>
        <div className="flex gap-x-1">
          <a className="font-light italic">by</a>
          <a href="https://github.com/Hraby/nextjs-todo" target="_blank" className="font-light italic underline hover:font-normal hover:cursor-pointer">hraby</a>
        </div>
      </div>
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="max-w-5xl mt-4 flex mx-auto">
          <form action={createPost} className="flex items-center gap-x-4">
            <Input name="todoText" type="text"/>
            <Button color="secondary" type="submit">Add Todo</Button>
          </form>
        </div>
      </div>
      <Table className="mt-8 mx-auto max-w-5xl w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Todo</TableHead>
            <TableHead className="text-right w-[0px]"></TableHead>
            <TableHead className="text-right w-[0px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((todo: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{todo.message}</TableCell>
            <TableCell className="text-right"><Pencil/></TableCell>
            <TableCell className="text-right"><Trash2 /></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
