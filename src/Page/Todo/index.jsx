import React, {useState} from 'react'

function index() {
    const [input, setInput] = useState('');
    const [todoList, setTodoList] = useState([]);

const addTodoItem = () => {
    const item = {
        id: Date.now(),
        text: input,
        completed: false
    }
    if (input === '') {
        return;
    }

    setTodoList(prev => [...prev, item]);
    setInput('');
}

const toggelTodo = (id) => {
    setTodoList(
        todoList.map(t => {
        if(t.id === id) {
            return {
                ...t,
                completed: !t.completed
         }
        } else {
            return t;
        }
    }))
}

const deleteTodo = (id) => {
    setTodoList(todoList.filter(t => (t.id !== id)))
}
  return (
    <div className='flex items-center justify-center mt-4 w-full'>
      <div className='flex items-center justify-center w-full max-w-210 bg-[#A4B9EE] rounded-2xl px-2 py-4'>
        <div className='flex flex-col w-ful max-w-210 items-center justify-center'>
            <div className='text-2xl mt-auto text-white font-bold'>React Todo List</div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                    <input
                        className='rounded-[0.25rem] bg-white px-2 py-2'
                        placeholder='Enter Todo'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                     />
                    <button className='px-4 py-2 rounded-[0.25rem] text-white bg-[#517FF6]' onClick={() => addTodoItem()}>Add</button>
                </div>
                <div className='mt-4'>
                    <ul>
                        {todoList.map((item) => {
                            return (
                                <li key={item.id} className='flex items-center'>
                                    <div className='flex gap-3 items-center'>
                                        <input type='checkbox' checked={item.completed} onChange={(id) => toggelTodo(item.id)} />
                                        <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
                                        <button className='px-4 py-2 rounded text-white bg-[#517FF6]' onClick={() => deleteTodo(item.id)}>Delete</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default index
