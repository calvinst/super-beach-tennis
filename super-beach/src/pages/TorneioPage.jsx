import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import Rodada from "../ui/Rodada";
import Torneio from "../ui/Torneio";

export default function TorneioPage() {
  const navigate = useNavigate();
  const torneio = useTorneioStore((s) => s.torneio);
  const registrarResultado = useTorneioStore((s) => s.registrarResultado);
  const resetarTorneio = useTorneioStore((s) => s.resetarTorneio);

  if (!torneio) navigate("/config");

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between">
        <button className="btn btn-outline" onClick={() => navigate("/jogadores")}>
          ← Jogadores
        </button>

        <button
          className="btn btn-outline"
          onClick={() => {
            resetarTorneio();
            navigate("/config");
          }}
        >
          Novo torneio
        </button>
      </div>

      {torneio.jogos.map((rodada) => (
        <Rodada
          key={rodada.numero}
          rodada={rodada}
          onSalvarResultado={registrarResultado}
        />
      ))}

      <Torneio torneio={torneio} />
    </div>
  );
}
