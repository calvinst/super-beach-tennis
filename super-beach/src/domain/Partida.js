export function criarPartida(duplaA, duplaB, rodada) {
  return {
    id: crypto.randomUUID(),
    rodada,
    duplaA,
    duplaB,
    placar: {
      duplaA: null,
      duplaB: null,
    },
  };
}
