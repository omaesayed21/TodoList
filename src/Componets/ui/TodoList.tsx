import Button from "./Button"

const TodoList = () =>{
    return <>
    <div className=" space-y-4">
        <div className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
            <p  className=" w-full font-semibold"> First Todo</p>
            <div className=" flex gap-2 items-center justify-end  space-x-3">
                <Button variant={"cancel"} size={"sm"}>Edit</Button>
                <Button variant={"danger"} size={"sm"}>Delete</Button>
            </div>

        </div>

    </div>
    
    </>
}
export default TodoList