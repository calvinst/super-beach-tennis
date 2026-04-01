import PartidaCard from "./PartidaCard";
import { useTorneioStore } from "../state/useTorneioStore";

function agruparPartidas(partidas, tamanho) {
  const grupos = [];
  for (let i = 0; i < partidas.length; i += tamanho) {
    grupos.push(partidas.slice(i, i + tamanho));
  }
  return grupos;
}

export default function Rodada({ rodada, onSalvarResultado, numeroRodada }) {
  const config = useTorneioStore((s) => s.config);

  if (!rodada || !Array.isArray(rodada.partidas)) return null;

  const partidasValidas = rodada.partidas.filter((p) => p && p.duplaA && p.duplaB);

  const tamanhoGrupo = config?.qtdQuadras || 3;

  const grupos = agruparPartidas(partidasValidas, tamanhoGrupo);

  return (
    <div className="space-y-6">
      {grupos.map((grupo, idx) => (
        <div key={idx} className="grid gap-3 border border-gray-200 p-4 rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold text-secondary">Rodada {numeroRodada}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
            {grupo.map((partida) => (
              <PartidaCard key={partida.id} partida={partida} onSalvar={onSalvarResultado} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
