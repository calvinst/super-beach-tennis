import { useTorneioStore } from "../state/useTorneioStore";

export default function ConfigurarTorneio({ onConfirmar }) {
  const config = useTorneioStore((s) => s.config);
  const setConfigField = useTorneioStore((s) => s.setConfigField);

  const qtdJogadores = config?.qtdJogadores ?? "";
  const criterioRanking = config?.criterioRanking ?? "";
  const qtdQuadras = config?.qtdQuadras ?? "";

  function handleJogadoresChange(value) {
    setConfigField("qtdJogadores", Number(value));
    // Se escolher 8 jogadores, travar em 2 quadras
    if (Number(value) === 8) {
      setConfigField("qtdQuadras", 2);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmar(config); // config já está atualizado no store
  }

  return (
    <div className="flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">Beach Tennis 🎾</h1>
        <p className="text-base-content/60">Organize seu torneio de forma rápida e prática</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md mt-10">
        <div className="card bg-base-100 shadow-xl border border-gray-200 backdrop-blur-sm">
          <div className="card-body space-y-6">
            <h2 className="text-xl font-semibold text-center">Configurar Torneio</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Jogadores */}
              <div className="space-y-1">
                <label className="text-sm text-base-content/70">Quantidade de jogadores</label>
                <select
                  className="select w-full"
                  value={qtdJogadores}
                  onChange={(e) => handleJogadoresChange(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value={8}>8 jogadores</option>
                  <option value={12}>12 jogadores</option>
                </select>
              </div>

              {/* Quadras */}
              <div className="space-y-1">
                <label className="text-sm text-base-content/70">Quantidade de quadras</label>
                <select
                  className="select w-full"
                  value={qtdQuadras}
                  onChange={(e) => setConfigField("qtdQuadras", Number(e.target.value))}
                  disabled={qtdJogadores === 8}
                  required
                >
                  <option value="">Selecione</option>
                  <option value={2}>2 quadras</option>
                  <option value={3}>3 quadras</option>
                </select>
                {qtdJogadores === 8 && (
                  <p className="text-xs text-base-content/50">Com 8 jogadores, apenas 2 quadras disponíveis</p>
                )}
              </div>

              {/* Critério de ranking */}
              <div className="space-y-1">
                <label className="text-sm text-base-content/70">Critério de ranking</label>
                <select
                  className="select w-full"
                  value={criterioRanking}
                  onChange={(e) => setConfigField("criterioRanking", e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="vitorias">Vitórias</option>
                  <option value="games">Games</option>
                </select>
              </div>

              {/* Botão */}
              <button type="submit" className="btn btn-primary w-full text-white font-semibold">
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
