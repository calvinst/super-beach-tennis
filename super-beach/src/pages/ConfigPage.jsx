import { useNavigate } from "react-router-dom";
import { useTorneioStore } from "../state/useTorneioStore";
import ConfigurarTorneio from "../ui/ConfigurarTorneio";

export default function ConfigPage() {
  const navigate = useNavigate();
  const setConfig = useTorneioStore((s) => s.setConfig);

  return (
    <ConfigurarTorneio
      onConfirmar={(config) => {
        setConfig(config);
        navigate("/jogadores");
      }}
    />
  );
}
