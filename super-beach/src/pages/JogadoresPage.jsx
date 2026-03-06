import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import AdicionarJogadores from "../ui/AdicionarJogadores";
import { IconConfig } from "../util/Icons";
import { useEffect } from "react";

export default function JogadoresPage() {
  const navigate = useNavigate();
  const config = useTorneioStore((s) => s.config);
  const iniciarTorneio = useTorneioStore((s) => s.iniciarTorneio);

  useEffect(() => {
    if (!config) navigate("/config");
  }, [config]);

  if (!config) return null;

  return (
    <div className="flex flex-col items-start mt-5 px-4 gap-4 max-w-md mx-auto w-full">
      {/* Botão alinhado à esquerda */}
      <button className="btn btn-sm bg-gray-50 shadow" onClick={() => navigate("/config")}>
        <span>
          <IconConfig />
        </span>
        <span>Configurações</span>
      </button>

      {/* Card também alinhado à esquerda */}
      <AdicionarJogadores
        limiteJogadores={config.qtdJogadores}
        onGerarTorneio={(jogadores) => {
          iniciarTorneio(jogadores, config);
          window.scrollTo(0, 0);
          navigate("/torneio");
        }}
        onVoltar={() => navigate("/config")}
      />
    </div>
  );
}
