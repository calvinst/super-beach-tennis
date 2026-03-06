import { useState } from "react";
import { useTorneioStore } from "../state/useTorneioStore";

export default function ConfigurarTorneio({ onConfirmar }) {
  const config = useTorneioStore((s) => s.config);
  const setConfigField = useTorneioStore((s) => s.setConfigField);

  const qtdJogadores = config?.qtdJogadores ?? "";
  const maxConfrontos = config?.maxConfrontos ?? "";
  const qtdQuadras = config?.qtdQuadras ?? "";

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmar(config); // config já está atualizado no store
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
                onChange={(e) => setConfigField("qtdJogadores", Number(e.target.value))}
                required
              >
                <option value="">Selecione</option>
                <option value={8}>8 jogadores</option>
                <option value={12}>12 jogadores</option>
              </select>
            </div>

            <div>
              <label className="label">Quantidade de quadras</label>
              <select
                className="select w-full"
                value={qtdQuadras}
                onChange={(e) => setConfigField("qtdQuadras",   Number(e.target.value))}
                required
              >
                <option value="">Selecione</option>
                <option value={2}>2 quadras</option>
                <option value={3}>3 quadras</option>
              </select>
            </div>

            {/* Confrontos */}
            <div>
              <label className="label">Máx. confrontos repetidos (somente no super 8)</label>
              <select
                className="select w-full"
                value={maxConfrontos}
                onChange={(e) => setConfigField("maxConfrontos", Number(e.target.value))}
              >
                <option value="">Selecione</option>
                <option value={2}>Até 2 vezes</option>
                <option value={3}>Até 3 vezes</option>
              </select>
            </div>

            <button type="submit" className="btn btn-secondary w-full">
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
