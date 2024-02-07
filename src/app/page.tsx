import {ProgressCircle} from "@/components/progress-circle"

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
      <div className="max-w-5xl w-full flex items-center">
        <div className="flex mx-auto items-center gap-x-8">
          <h1 className="text-xl mx-auto">Dnešní Todo</h1>
          <ProgressCircle totalTasks={4} completedTasks={1}/>
        </div>
      </div>
    </main>
  );
}
