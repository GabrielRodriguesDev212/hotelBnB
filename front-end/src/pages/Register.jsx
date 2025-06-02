import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
const Register = () => {
  const { setUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password && name) {
      try {
        const { data: userDoc } = await axios.post("/users", {
          name,
          email,
          password,
        });
        setUser(userDoc);
        setRedirect(true);
      } catch (error) {
        alert(`Deu um erro ao cadastrar: ${error.response.data}`);
      }
    } else {
      alert("Você precisa preencher o nome, email e senha!!!");
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <section className="flex items-center">
      <div className="gap-4 flex flex-col items-center  max-w-96 mx-auto w-full">
        <h1 className="text-3xl font-bold ">Faça seu cadastro</h1>

        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full  border border-gray-300 rounded-full px-4 py-2 "
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full  border border-gray-300 rounded-full px-4 py-2 "
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full  border border-gray-300 rounded-full px-4 py-2 "
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-primary-400 rounded-full w-full py-2 px-4 text-white font-bold cursor-pointer">
            Registrar
          </button>
        </form>

        <p>
          Ja tem uma conta?
          <Link to="/login" className="font-semibold underline">
            Entre clicando aqui
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
