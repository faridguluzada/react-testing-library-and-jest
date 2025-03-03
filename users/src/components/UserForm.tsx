import { FormEvent, useState } from "react";
import { IUser } from "../App";

function UserForm({ onUserAdd }: { onUserAdd: (user: IUser) => void }) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUserAdd({ name, email });
    setEmail("");
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button>Add User</button>
    </form>
  );
}

export default UserForm;
