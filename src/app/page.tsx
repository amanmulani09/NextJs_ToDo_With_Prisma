import { prisma } from "@/db"
import Link from "next/link"
import { TodoItem } from "@/components/TodoItem";
export default async function Home(){

  const getTodos =()=> prisma.todo.findMany();
  const todos = await getTodos();

  const toggleTodo = async(id:string,complete:boolean)=>{
"use server"
console.log(id,complete)
await prisma.todo.update({
  where:{id},data:{
    complete
  }
})
}
  return(
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link 
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700
       focus-within:bg-slate-700 outline-none "
      href="/new"
      >
        New
        </Link>
    </header>
    <ul className="pl-4">
      {todos && todos.map((todo)=>{
        return(
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        )
      })}
    </ul>
    </>
  )
}