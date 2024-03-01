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
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { addTodo, delTodo, editTodo } from "@/lib/db";
import { Label } from "@/components/ui/label";

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

  async function handleEdit(formData: FormData){
    "use server"

    const todoId = formData.get("id");
    const todoText = formData.get("message");

    if(todoId && todoText){
      const todo = await editTodo(todoId.toString(), todoText.toString())
      console.log(todo)
    }
    
    revalidatePath("/");

  }

  async function handleDelete(formData: FormData){
    "use server"

    const todoId = formData.get("id");
    if(todoId) {
      const todo = await delTodo(todoId.toString())
      console.log(todo)
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
            <Button color="secondary" type="submit">Přidat Todo</Button>
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
            <TableCell className="text-right">
            <Dialog>
              <DialogTrigger asChild>
                <button><Pencil/></button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
              <form action={handleEdit}>
                <DialogHeader>
                  <DialogTitle>Upravit Todo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message">
                      Zpráva
                    </Label>
                    <Input
                      type="text"
                      name="message"
                      id="message"
                      defaultValue={todo.message}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button name="id" value={todo.id} type="submit">Uložit</Button>
                  </DialogClose>
                </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            </TableCell>
            <TableCell className="text-right">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                <button><Trash2/></button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form action={handleDelete}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Jste si jistý?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Tuto akci nelze vzít zpět. Tím se trvale odstraní vaše
                      a vaše data budou odstraněna z našich serverů.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Zrušit</AlertDialogCancel>
                    <AlertDialogAction><button name="id" value={todo.id} type="submit">Potvrdit</button></AlertDialogAction>
                  </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
