import { useState } from "react";

export default function ConfigurarTorneio({ onConfirmar }) {
  const [qtdJogadores, setQtdJogadores] = useState("");
  const [maxConfrontos, setMaxConfrontos] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmar({ qtdJogadores: Number(qtdJogadores), maxConfrontos: Number(maxConfrontos) });
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="card w-md bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-xl">Configurar Torneio</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantidade */}
            <div>
              <label className="label">Quantidade de jogadores</label>
              <select
                className="select w-full"
                value={qtdJogadores}
                onChange={(e) => setQtdJogadores(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value={8}>8 jogadores</option>
                <option value={12}>12 jogadores</option>
              </select>
            </div>

            {/* Confrontos */}
            <div>
              <label className="label">Máx. confrontos repetidos (somente no super 8)</label>
              <select
                className="select w-full"
                value={maxConfrontos}
                onChange={(e) => setMaxConfrontos(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value={2}>Até 2 vezes</option>
                <option value={3}>Até 3 vezes</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}