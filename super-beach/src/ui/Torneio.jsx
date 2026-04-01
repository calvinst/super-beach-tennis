import ModalRanking from "./ModalRanking";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconTrophy, IconMedal } from "../util/Icons";

function Torneio({ torneio, ranking, onFinalizar, onResetar }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!torneio) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <button
          className="btn btn-sm bg-gray-50 shadow"
          onClick={() => {
            onFinalizar();
            setIsOpen(true);
          }}
        >
          <span>
            <IconMedal color="text-primary" />
          </span>
          {!torneio.finalizado ? "Finalizar torneio" : "Mostrar ranking"}
        </button>

        <button
          className="btn btn-sm bg-gray-50 shadow"
          onClick={() => {
            onResetar();
            navigate("/config");
          }}
        >
          <span>
            <IconTrophy color="text-yellow-400" />
          </span>
          <span>Novo torneio</span>
        </button>
      </div>

      {torneio.finalizado && isOpen && <ModalRanking ranking={ranking} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Torneio;
