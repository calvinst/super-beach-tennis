import { useState } from "react";

export default function AdicionarJogadores({ onGerarTorneio, limiteJogadores }) {
  const [nome, setNome] = useState("");
  const [jogadores, setJogadores] = useState([]);

  function adicionarJogador() {
    if (!nome.trim()) return;

    setJogadores((prev) => [...prev, { id: crypto.randomUUID(), nome: nome.trim() }]);
    setNome("");
  }

  function removerJogador(id) {
    setJogadores((prev) => prev.filter((j) => j.id !== id));
  }

  const podeGerar = jogadores.length === limiteJogadores;

  return (
    // <div className="flex justify-center mt-10 px-4">
      <div className="card w-md bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-xl">Adicionar Jogadores</h2>

          {/* Input */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Nome do jogador"
              className="input input-bordered w-full"
              value={nome}
              disabled={jogadores.length >= limiteJogadores}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarJogador()}
            />
            <button className="btn btn-secondary text-gray-100" onClick={adicionarJogador}>
              Adicionar
            </button>
          </div>

          {/* Lista */}
          <ul className="space-y-2">
            {jogadores.map((j, index) => (
              <li key={j.id} className="flex items-center justify-between bg-gray-100 rounded p-2 ">
                <span>
                  {index + 1}. <span className="font-semibold">{j.nome}</span>
                </span>
                <button className="btn btn-xs btn-error" onClick={() => removerJogador(j.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {/* Ação */}
          <button className="btn btn-primary" disabled={!podeGerar} onClick={() => onGerarTorneio(jogadores)}>
            Gerar Torneio
          </button>
        </div>
      </div>
    // </div>
  );
}
