import PartidaCard from "./PartidaCard";

function agruparPartidas(partidas, tamanho) {
  const grupos = [];
  for (let i = 0; i < partidas.length; i += tamanho) {
    grupos.push(partidas.slice(i, i + tamanho));
  }
  return grupos;
}

export default function Rodada({ rodada, onSalvarResultado }) {
  if (!rodada || !Array.isArray(rodada.partidas)) return null;

  const partidasValidas = rodada.partidas.filter((p) => p && p.duplaA && p.duplaB);

  // 🔹 2 para Super 8, 3 para Super 12
  const tamanhoGrupo = partidasValidas.length <= 2 ? 2 : 3;

  const grupos = agruparPartidas(partidasValidas, tamanhoGrupo);

  return (
    <div className="space-y-6">
      {grupos.map((grupo, idx) => (
        <div key={idx} className="grid gap-3">
          {grupo.map((partida) => (
            <PartidaCard key={partida.id} partida={partida} onSalvar={onSalvarResultado} />
          ))}
        </div>
      ))}
    </div>
  );
}
