import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { revalidatePath, unstable_noStore } from "next/cache";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {createPost, handleEdit, handleDelete, handleCheckbox} from "./action";
import {fetchData} from "@/data/todos"

export default async function Home() {
  unstable_noStore();

  const data = await fetchData();

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
            <TableHead></TableHead>
            <TableHead className="text-right w-[0px]"></TableHead>
            <TableHead className="text-right w-[0px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {data && data
          .sort((a, b) => a.id - b.id) // Seřadit pole podle ID
          .map((todo: any) => (
            <TableRow key={todo.id}>
              <TableCell className="w-[50px]">
                <form action={handleCheckbox}>
                  <input type="hidden" name="id" value={todo.id}/>
                  <input type="hidden" name="status" value={todo.status}/>
                  <Checkbox checked={todo.status === "on"} type="submit"/>
                </form>
              </TableCell>
              <TableCell className={`font-medium ${todo.status === 'off' ? 'text-default' : 'text-slate-500'}`}>{todo.message}</TableCell>
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
                          Tuto akci nelze vzít zpět. Tím se trvale odstraní vaše a vaše data budou odstraněna z našich serverů.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Zrušit</AlertDialogCancel>
                        <AlertDialogAction name="id" value={todo.id} type="submit">Potvrdit</AlertDialogAction>
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
