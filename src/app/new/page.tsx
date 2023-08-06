import Link from "next/link"
import { redirect } from "next/navigation";
import { prisma } from "@/db"
export default function New() {
    async function createTodo(data: FormData) {
        "use server"
        const title = data.get('todoTitle')?.valueOf()
        console.log(title);
        console.log(typeof title)
        if (typeof title !== "string") {
            throw new Error("invalid Title")
        }

        await prisma.todo.create({
            data: {
                title,
                complete: false,
            }
        })
        redirect("/");
    }
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form action={createTodo} className="flex gap-2 flex-col">

                <input type="text" name="todoTitle" className="border border-slate-300
             bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100 " />

                <div className="flex gap-1 justify-end">
                    <Link href="..."
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700
                focus-within:bg-slate-700 outline-none "
                    >Cancel</Link>
                    <button type="submit"
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700
                focus-within:bg-slate-700 outline-none "
                    > Create</button>
                </div>

            </form>

        </>
    )
}