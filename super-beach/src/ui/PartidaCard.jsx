import { useEffect, useState } from "react";

export default function PartidaCard({ partida, onSalvar }) {
  const [gamesA, setGamesA] = useState("");
  const [gamesB, setGamesB] = useState("");
  const jogadoresA = partida?.duplaA?.jogadores ?? [];
  const jogadoresB = partida?.duplaB?.jogadores ?? [];

  // carregar placar existente (edição)
  useEffect(() => {
    if (partida.placar) {
      setGamesA(partida.placar.duplaA !== null ? partida.placar.duplaA : "");
      setGamesB(partida.placar.duplaB !== null ? partida.placar.duplaB : "");
    }
  }, [partida]);

  const podeSalvar = gamesA !== "" && gamesB !== "";

  return (
    <div className="card bg-gray-100 shadow-sm">
      <div className="card-body p-4 space-y-4">
        {/* Duplas */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          <div className="font-semibold">{jogadoresA.map((j) => j.nome).join(" / ")}</div>

          <span className="badge badge-outline">vs</span>

          <div className="font-semibold">{jogadoresB.map((j) => j.nome).join(" / ")}</div>
        </div>

        {/* Placar */}
        <div className="flex justify-center items-center gap-2">
          <input
            type="number"
            min="0"
            className="input input-bordered w-20 text-center bg-gray-50"
            value={gamesA}
            onChange={(e) => setGamesA(e.target.value)}
          />

          <span className="font-bold">x</span>

          <input
            type="number"
            min="0"
            className="input input-bordered w-20 text-center bg-gray-50"
            value={gamesB}
            onChange={(e) => setGamesB(e.target.value)}
          />
        </div>

        {/* Ação */}
        <div className="flex justify-center">
          <button
            className="btn btn-primary btn-sm"
            disabled={!podeSalvar}
            onClick={() => onSalvar(partida.id, Number(gamesA), Number(gamesB))}
          >
            {partida.placar?.duplaA !== null ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
