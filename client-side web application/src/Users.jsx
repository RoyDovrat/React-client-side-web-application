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
  const [toggleAddUser, setToggleAddUser] = useState(false)

  const [todos, setTodos] = useState([])
  const [userTodos, setUserTodos] = useState([])
  const [toggleAddTodo, setToggleAddTodo] = useState(false)

  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [toggleAddPost, setToggleAddPost] = useState(false)


  // Will run once - at the component creation (Mounting)
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await getAll(USERS_URL);
      setUsers(usersData);
      setFilteredUsersData(usersData)

      const { data: todoData } = await getAll(TODOS_URL);
      setTodos(todoData);

      const { data: postsData } = await getAll(POSTS_URL);
      setPosts(postsData);
    };
    fetchData();
  }, []);

  // Update filtered users whenever `searchTerm` changes
  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsersData(filteredUsers);
  }, [searchTerm, users]);


  // Update filtered users whenever `toggleHighlight` changes
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
    <div style={{ display: 'flex', position: 'relative' }}>
      <div className="users-container">

        <div style={{ marginBottom: '20px' }}>
          <label>Search: </label>
          <input type="text" style={{ marginRight: '150px' }} onChange={(e) => setSearchTerm(e.target.value)} />

          <button className="button add" onClick={() => setToggleAddUser(true)}>Add</button>
        </div>

        {
          filteredUsersData.map((user) => <User key={user.id} user={user} onUpdate={handleUserUpdate} onDelete={handleUserDelete} setToggleHighlight={setToggleHighlight} toggleHighlight={toggleHighlight} todos={todos} />)
        }

      </div>

      {toggleHighlight.toggle && !toggleAddUser &&
        <div>
          <div className="todos-container"  >

            {!toggleAddTodo &&
              <div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ marginRight: '330px' }}>Todos-User {toggleHighlight.id}</label>
                  <button className="button add" onClick={() => setToggleAddTodo(true)}>Add</button>
                </div>

                {
                  userTodos.map((todo) => <Todo key={todo.id} todo={todo} markCompleted={handleMarkTodoAsCompleted} />)
                }

              </div>
            }

            {toggleAddTodo &&
              <div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ marginRight: '330px' }}>New Todo-User {toggleHighlight.id}</label>
                </div>

                {
                  <NewTodo toggleHighlight={toggleHighlight} setToggleAddTodo={setToggleAddTodo} addNewTodo={addNewTodo} />
                }

              </div>
            }
          </div>


          <div className="posts-container" >

            {!toggleAddPost &&
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ marginRight: '330px' }}>Posts-User {toggleHighlight.id}</label>
                  <button className="button add" onClick={() => setToggleAddPost(true)}>Add</button>
                </div>

                {
                  userPosts.map((post) => <Post key={post.id} post={post} />)
                }

              </div>
            }

            {toggleAddPost &&
              <div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ marginRight: '330px' }}>New Post-User {toggleHighlight.id}</label>
                </div>

                {
                  <NewPost toggleHighlight={toggleHighlight} setToggleAddPost={setToggleAddPost} addNewPost={addNewPost} />
                }

              </div>
            }


          </div>
        </div>
      }


      {toggleAddUser &&
        <div className="users-container">
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '330px' }}>Add New User</label>
          </div>

          {
            <NewUser setToggleAddUser={setToggleAddUser} addNewUser={addNewUser} />
          }

        </div>
      }


    </div>


  )
}

export default Users
