import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import AdicionarJogadores from "../ui/AdicionarJogadores";

export default function JogadoresPage() {
  const navigate = useNavigate();
  const config = useTorneioStore((s) => s.config);
  const iniciarTorneio = useTorneioStore((s) => s.iniciarTorneio);

  if (!config) navigate("/config");

  return (
    <div className="flex flex-col items-start mt-10 px-4 gap-4 max-w-md mx-auto w-full">
      {/* Botão alinhado à esquerda */}
      <button className="btn btn-outline" onClick={() => navigate("/config")}>
        ← Configurações
      </button>

      {/* Card também alinhado à esquerda */}
      <AdicionarJogadores
        limiteJogadores={config.qtdJogadores}
        onGerarTorneio={(jogadores) => {
          iniciarTorneio(jogadores, config);
          navigate("/torneio");
        }}
        onVoltar={() => navigate("/config")}
      />
    </div>
  );
}
