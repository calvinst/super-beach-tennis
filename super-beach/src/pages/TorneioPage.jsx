import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import Rodada from "../ui/Rodada";
import Torneio from "../ui/Torneio";
import { IconConfig, IconPeople, IconTrophy } from "../util/Icons";
import { useEffect } from "react";
import { getRankingOrdenado } from "../services/torneioService";

export default function TorneioPage() {
  const navigate = useNavigate();
  const torneio = useTorneioStore((s) => s.torneio);
  const registrarResultado = useTorneioStore((s) => s.registrarResultado);
  const resetarTorneio = useTorneioStore((s) => s.resetarTorneio);
  const finalizarTorneio = useTorneioStore((s) => s.finalizarTorneio);

  useEffect(() => {
    if (!torneio) navigate("/config");
  }, [torneio]);

  if (!torneio) return null;

  const ranking = torneio.finalizado ? getRankingOrdenado(torneio) : [];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {torneio?.jogos.map((rodada, idx) => (
        <Rodada key={rodada.numero} rodada={rodada} onSalvarResultado={registrarResultado} numeroRodada={idx + 1} />
      ))}

      <Torneio torneio={torneio} ranking={ranking} onFinalizar={finalizarTorneio} onResetar={resetarTorneio} />
    </div>
  );
}
