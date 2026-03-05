import { useState } from "react";

export default function ConfigurarTorneio({ onConfirmar }) {
  const [qtdJogadores, setQtdJogadores] = useState(8);
  const [maxConfrontos, setMaxConfrontos] = useState(2);

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="card w-md bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-xl">
            Configurar Torneio
          </h2>

          {/* Quantidade */}
          <div>
            <label className="label">Quantidade de jogadores</label>
            <select
              className="select select-bordered w-full"
              value={qtdJogadores}
              onChange={(e) => setQtdJogadores(Number(e.target.value))}
            >
              <option value={8}>8 jogadores</option>
              <option value={12}>12 jogadores</option>
            </select>
          </div>

          {/* Confrontos */}
          <div>
            <label className="label">Máx. confrontos repetidos (somente no super 8)</label>
            <select
              className="select select-bordered w-full"
              value={maxConfrontos}
              onChange={(e) => setMaxConfrontos(Number(e.target.value))}
            >
              <option value={2}>Até 2 vezes</option>
              <option value={3}>Até 3 vezes</option>
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => onConfirmar({ qtdJogadores, maxConfrontos })}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}