export function criarDupla(j1, j2) {
  return {
    id: `${j1.id}-${j2.id}`,
    jogadores: [j1, j2],
  };
}