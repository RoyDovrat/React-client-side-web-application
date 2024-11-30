import { useEffect, useState } from 'react'
import { getAll, addItem } from './utils';
import User from './User';
import './Style.css';
import Todo from './Todo';
import Post from './Post';
import NewTodo from './NewTodo';
import NewPost from './NewPost';
import NewUser from './NewUser';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function Users() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsersData, setFilteredUsersData] = useState([])
  const [toggleHighlight, setToggleHighlight] = useState({ id: '', toggle: false })
  const [isAddUserVisible, setAddUserVisible] = useState(false)

  const [todos, setTodos] = useState([])
  const [userTodos, setUserTodos] = useState([])
  const [isAddTodoVisible, setAddTodoVisible] = useState(false)

  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [isAddPostVisible, setAddPostVisible] = useState(false)


  // Will run once - at the component creation (Mounting)
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await getAll(USERS_URL);
      const { data: todoData } = await getAll(TODOS_URL);
      const { data: postsData } = await getAll(POSTS_URL);

      setUsers(usersData);
      setFilteredUsersData(usersData)
      setTodos(todoData);
      setPosts(postsData);
    };
    fetchData();
  }, []);

  // Update filtered users whenever searchTerm/users changes
  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsersData(filteredUsers);
  }, [searchTerm, users]);


  // Update filtered users whenever toggleHighlight/todos/posts changes
  useEffect(() => {
    if (toggleHighlight.id) {
      const currUserTodos = todos.filter((todo) => todo.userId.toString() === toggleHighlight.id.toString());
      setUserTodos(currUserTodos);

      const currUserPosts = posts.filter((post) => post.userId.toString() === toggleHighlight.id.toString());
      setUserPosts(currUserPosts);
    }
  }, [toggleHighlight, todos, posts]);

  const handleUserUpdate = (id, updatedUser) => {
    const updatedUsers = users.map((user) => (user.id.toString() === id.toString() ? updatedUser : user));
    setUsers(updatedUsers);
    alert('User updated successfully!')
  }

  const handleUserDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id.toString() !== id.toString());
    setUsers(updatedUsers);
    alert('User deleted successfully!')
  }


  const handleMarkTodoAsCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
  };

  const addNewTodo = async (obj) => {
    const { data: newTodo } = await addItem(TODOS_URL, obj);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    if (newTodo.userId.toString() === toggleHighlight.id.toString()) {
      const updatedUserTodos = [...userTodos, newTodo];
      setUserTodos(updatedUserTodos);
    }

    alert('Todo added successfully!')
  }

  const addNewPost = async (obj) => {
    const { data: newPost } = await addItem(POSTS_URL, obj);
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);

    if (newPost.userId.toString() === toggleHighlight.id.toString()) {
      const updatedUserPosts = [...userPosts, newPost];
      setUserPosts(updatedUserPosts);
    }

    alert('Post added successfully!')
  }

  const addNewUser = async (obj) => {
    const { data: newUser } = await addItem(USERS_URL, obj);
    const updatedUsers = [...users, { ...newUser, address: { street: '', city: '', zipcode: '' } }];
    setUsers(updatedUsers);

    alert('User added successfully!')
  }

  return (
    <div className="users-main-container">
      <div className="users-container">

        <div className="users-header">
          <label>Search: </label>
          <input type="text" className="serach-text" onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="button add" onClick={() => setAddUserVisible(true)}>Add</button>
        </div>

        {
          filteredUsersData.map((user) => <User key={user.id} user={user} onUpdate={handleUserUpdate} onDelete={handleUserDelete} setToggleHighlight={setToggleHighlight} toggleHighlight={toggleHighlight} todos={todos} />)
        }

      </div>

      {/******************** user`s todos list ************************************/}
      {toggleHighlight.toggle && !isAddUserVisible &&
        <div>
          <div>

            {!isAddTodoVisible &&
              <div>

                <div style={{ marginBottom: '10px' }}>
                  <label className="todos-label" >Todos-User {toggleHighlight.id}</label>
                  <button className="button add" onClick={() => setAddTodoVisible(true)}>Add</button>
                </div>

                <div className="todos-container" >
                  {
                    userTodos.map((todo) => <Todo key={todo.id} todo={todo} markCompleted={handleMarkTodoAsCompleted} />)
                  }
                </div>

              </div>
            }

            {isAddTodoVisible &&
              <div>

                <div style={{ marginBottom: '15px' }}>
                  <label className="new-todo-label" >New Todo-User {toggleHighlight.id}</label>
                </div>

                <div className="todos-container">
                  {
                    <NewTodo toggleHighlight={toggleHighlight} setAddTodoVisible={setAddTodoVisible} addNewTodo={addNewTodo} />
                  }
                </div>


              </div>
            }
          </div>
          <div>

            {/******************** user`s posts list ************************************/}
            {!isAddPostVisible &&
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <label className="posts-label" >Posts-User {toggleHighlight.id}</label>
                  <button className="button add" onClick={() => setAddPostVisible(true)}>Add</button>
                </div>

                <div className="posts-container">

                  {
                    userPosts.map((post) => <Post key={post.id} post={post} />)
                  }
                </div>

              </div>
            }

            {isAddPostVisible &&
              <div>

                <div style={{ marginBottom: '15px' }}>
                  <label className="new-post-label">New Post-User {toggleHighlight.id}</label>
                </div>

                <div className="posts-container">
                  {
                    <NewPost toggleHighlight={toggleHighlight} setAddPostVisible={setAddPostVisible} addNewPost={addNewPost} />
                  }
                </div>

              </div>
            }
          </div>
        </div>
      }

      {/******************** add new user ************************************/}
      {isAddUserVisible &&
        <div style={{ marginLeft: '45px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label className="new-user-label">Add New User</label>
          </div>

          <div className="new-user-container">
            {
              <NewUser setAddUserVisible={setAddUserVisible} addNewUser={addNewUser} />
            }
          </div>

        </div>
      }

    </div>


  )
}

export default Users
