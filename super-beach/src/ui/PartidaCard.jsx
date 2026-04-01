import { useEffect, useState } from "react";

function getInitials(jogadores) {
  return jogadores.map((j) => j.nome.charAt(0).toUpperCase());
}

function AvatarDupla({ jogadores, colorBg, colorText }) {
  const initials = getInitials(jogadores);
  return (
    <div className="flex">
      {initials.map((letra, i) => (
        <div
          key={i}
          style={{
            backgroundColor: colorBg,
            color: colorText,
            marginLeft: i > 0 ? "-8px" : "0",
            border: "2px solid var(--fallback-b1, oklch(var(--b1)))",
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-0"
        >
          {letra}
        </div>
      ))}
    </div>
  );
}

export default function PartidaCard({ partida, onSalvar }) {
  const [gamesA, setGamesA] = useState("");
  const [gamesB, setGamesB] = useState("");
  const jogadoresA = partida?.duplaA?.jogadores ?? [];
  const jogadoresB = partida?.duplaB?.jogadores ?? [];

  useEffect(() => {
    if (partida.placar) {
      setGamesA(partida.placar.duplaA !== null ? String(partida.placar.duplaA) : "");
      setGamesB(partida.placar.duplaB !== null ? String(partida.placar.duplaB) : "");
    }
  }, [partida]);

  const podeSalvar = gamesA !== "" && gamesB !== "";
  const jaTemPlacar = partida.placar?.duplaA !== null;

  const a = parseInt(gamesA);
  const b = parseInt(gamesB);
  const vencedor =
    !isNaN(a) && !isNaN(b) && a !== b
      ? a > b
        ? jogadoresA.map((j) => j.nome).join(" / ")
        : jogadoresB.map((j) => j.nome).join(" / ")
      : null;

  return (
    <div className="bg-base-100 rounded-2xl border border-base-200 p-4 w-full max-w-sm shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Dupla A */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-base-content text-center">
            {jogadoresA.map((j) => j.nome).join(" / ")}
          </p>
          <input
            type="number"
            min="0"
            value={gamesA}
            onChange={(e) => setGamesA(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="w-14 h-14 rounded-xl border border-base-200 bg-base-200 text-2xl font-medium text-center text-base-content focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* VS */}
        <span className="text-sm tracking-widest pb-6">vs</span>

        {/* Dupla B */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-base-content text-center">
            {jogadoresB.map((j) => j.nome).join(" / ")}
          </p>
          <input
            type="number"
            min="0"
            value={gamesB}
            onChange={(e) => setGamesB(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="w-14 h-14 rounded-xl border border-base-200 bg-base-200 text-2xl font-medium text-center text-base-content focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        <button
          className="btn btn-secondary btn-sm rounded-full px-8"
          disabled={!podeSalvar}
          onClick={() => onSalvar(partida.id, Number(gamesA), Number(gamesB))}
        >
          {jaTemPlacar ? "Atualizar" : "Salvar resultado"}
        </button>

        <p className="text-xs text-base-content/40 min-h-4">{vencedor ? `${vencedor} vencem` : "Empate"}</p>
      </div>
    </div>
  );
}
