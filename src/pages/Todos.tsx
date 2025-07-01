import { useState } from "react";
import TodoSkeleton from "../Componets/ui/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery"
import type { ITodo } from "../Interface";
import Paginator from "../Componets/ui/Paginator";

const TodosPage = () => {
    const [queryVerison , setQueryVerison] = useState(1)

    
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;


    const {isLoading , data } = useAuthenticatedQuery({url : "/todos" , 
   
    config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
    
    queryKey : ["pagenatedTodos"  , `${queryVerison}`]
 
 
    
    })
    console.log(data);
    
 
    if(isLoading){
        return <>
        
        <div className="space-y-1 p-3">
            {Array.from({ length: 3 }, (_, idx) => (
              <TodoSkeleton key={idx} />
            ))}{" "}
          </div>
    
        
        
        </>
          
            }
            
  return  <>
    <div className=" max-w-2xl mx-auto my-20 space-y-6">

    { data.data.length  ?  (


data.data.map((todo :ITodo) => (
    <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
    <h3  className=" w-full font-semibold">{todo.title}</h3>

</div>
))) : (

    <p className="  text-center text-5xl text-gray-500">No Todos Found</p>
)

} 
<Paginator pageCount={data.pageCount} total={data.total} page={data.page} onClickNext={() => setQueryVerison(queryVerison + 1)} onClickPrev={() => setQueryVerison(queryVerison - 1)} isLoading={isLoading} />
    </div>
 
 </> 

    
}

export default TodosPage