import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import Rodada from "../ui/Rodada";
import Torneio from "../ui/Torneio";
import { IconConfig, IconPeople, IconTrophy } from "../util/Icons";
import { useEffect } from "react";

export default function TorneioPage() {
  const navigate = useNavigate();
  const torneio = useTorneioStore((s) => s.torneio);
  const registrarResultado = useTorneioStore((s) => s.registrarResultado);
  const resetarTorneio = useTorneioStore((s) => s.resetarTorneio);
  const finalizarTorneio = useTorneioStore((s) => s.finalizarTorneio);

  console.log("TorneioPage renderizou", torneio);

  useEffect(() => {
    if (!torneio) navigate("/config");
  }, [torneio]);

  if (!torneio) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between">
        <button className="btn btn-sm bg-gray-50 shadow" onClick={() => navigate("/config")}>
          <span>
            <IconConfig />
          </span>
          <span>Configurações</span>
        </button>
        <button className="btn btn-sm bg-gray-50 shadow" onClick={() => navigate("/jogadores")}>
          <span>
            <IconPeople color="text-blue-600" />
          </span>
          <span>Jogadores</span>
        </button>

        <button
          className="btn btn-sm bg-gray-50 shadow"
          onClick={() => {
            resetarTorneio();
            navigate("/config");
          }}
        >
          <span>
            <IconTrophy color="text-yellow-400" />
          </span>
          <span>Novo torneio</span>
        </button>
      </div>

      {torneio?.jogos.map((rodada) => (
        <Rodada key={rodada.numero} rodada={rodada} onSalvarResultado={registrarResultado} />
      ))}

      <Torneio torneio={torneio} onFinalizar={finalizarTorneio} />
    </div>
  );
}
