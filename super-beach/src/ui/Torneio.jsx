import { finalizarTorneio, getRankingOrdenado } from "../services/torneioService";
import ModalRanking from "./ModalRanking";
import { useState } from "react";

function Torneio({ torneio, onFinalizar }) {
  if (!torneio) return null;

  const [isOpen, setIsOpen] = useState(false);

  const ranking = torneio.finalizado ? getRankingOrdenado(torneio) : [];

  return (
    <div className="space-y-6">
      <button
        className="btn btn-success"
        onClick={() => {
          onFinalizar();
          setIsOpen(true);
        }}
      >
        {!torneio.finalizado ? "Finalizar torneio" : "Mostrar ranking"}
      </button>

      {torneio.finalizado && isOpen && <ModalRanking ranking={ranking} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Torneio;
