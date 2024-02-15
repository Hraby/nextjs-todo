import {ProgressCircle} from "@/components/progress-circle"
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

export default function Home() {
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
        <div className="flex mx-auto items-center gap-x-8">
          <h1 className="text-xl mx-auto">Dnešní Todo</h1>
          <ProgressCircle totalTasks={4} completedTasks={1}/>
        </div>
        <div className="max-w-5xl mt-4 flex mx-auto">
          <form action="#" method="POST" className="flex items-center gap-x-4">
            <Input variant="bordered" type="text" label="Todo"/>
            <Button color="secondary">Add Todo</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
