import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToDoHome } from './components/to-do-home';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import { UserDashBoard } from './components/user-dashboard';
import { AddTask } from './components/add-task';
import { EditTask } from './components/edit-task';
import { UserError } from './components/user-error';

function App() {
  return (
    <div className="container-fluid todo-background">
        <BrowserRouter>
          <section className='mt-0'>
              <Routes>
                  <Route path='/' element={<ToDoHome />} />
                  <Route path='register' element={<UserRegister />} />
                  <Route path='login' element={<UserLogin />} />
                  <Route path='dashboard' element={<UserDashBoard />} />
                  <Route path='add-task' element={<AddTask />} />
                  <Route path='edit-task' element={<EditTask />} />
                  <Route path='error' element={<UserError />} />
              </Routes>
          </section>
        </BrowserRouter>
    </div>
  );
}

export default App;
