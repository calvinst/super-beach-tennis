import { useEffect } from "react";
import { useTorneioStore } from "../state/useTorneioStore";

export default function Super8() {
  const { torneio, iniciarTorneio } = useTorneioStore();

  useEffect(() => {
    iniciarTorneio(jogadoresMock);
  }, []);

  return (
    <>
      <h1>Super 8</h1>
      {torneio?.rodadas.map((rodada) => (
        <Rodada key={rodada.numero} rodada={rodada} />
      ))}
    </>
  );
}