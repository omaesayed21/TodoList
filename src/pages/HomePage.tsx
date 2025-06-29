import TodoList from "../Componets/ui/TodoList"

const HomePage = () => {
    return (
        <div className=" max-w-2xl mx-auto">
            {TodoList()}
        </div>
    )
}

export default HomePage