import { getTodos } from "@/lib/db";

export async function fetchData(){
    const data = await getTodos();
    return await data;
}