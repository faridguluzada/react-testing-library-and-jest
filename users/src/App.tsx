import { useState } from "react";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./App.css";

export interface IUser {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  const onUserAdd = (user: IUser) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
}

export default App;
