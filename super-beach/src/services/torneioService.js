import { gerarRodadas } from "./geradorDeRodadas";

export function criarTorneio(jogadores, config) {
  const jogos = gerarRodadas(jogadores, config);

  const ranking = {};
  jogadores.forEach((j) => {
    ranking[j.id] = {
      jogador: j,
      vitorias: 0,
      games: 0,
      zerados: 0, // ✅ adicionado
    };
  });

  return { jogadores, jogos, ranking, config, finalizado: false };
}

export function registrarResultado(torneio, partidaId, gamesDuplaA, gamesDuplaB) {
  const novoTorneio = {
    ...torneio,
    jogos: torneio.jogos.map((r) => ({
      ...r,
      partidas: r.partidas.map((p) => ({ ...p })),
    })),
    ranking: Object.fromEntries(Object.entries(torneio.ranking).map(([id, entry]) => [id, { ...entry }])),
  };

  let partida = null;

  novoTorneio.jogos.forEach((rodada) => {
    rodada.partidas.forEach((p) => {
      if (p.id === partidaId) partida = p;
    });
  });

  if (!partida) return novoTorneio;

  // remover resultado antigo (edição)
  if (partida.placar && partida.placar.duplaA !== null) {
    const { duplaA: oldA, duplaB: oldB } = partida.placar;
    const oldVencedora = oldA > oldB ? "A" : oldB > oldA ? "B" : null;

    partida.duplaA.jogadores.forEach((j) => {
      novoTorneio.ranking[j.id].games -= oldA;
      if (oldVencedora === "A") novoTorneio.ranking[j.id].vitorias -= 1;
      if (oldA === 0) novoTorneio.ranking[j.id].zerados -= 1; // ✅
    });

    partida.duplaB.jogadores.forEach((j) => {
      novoTorneio.ranking[j.id].games -= oldB;
      if (oldVencedora === "B") novoTorneio.ranking[j.id].vitorias -= 1;
      if (oldB === 0) novoTorneio.ranking[j.id].zerados -= 1; // ✅
    });
  }

  // salvar novo placar
  partida.placar = { duplaA: gamesDuplaA, duplaB: gamesDuplaB };

  // somar novos games, vitória e zerados
  const novaVencedora = gamesDuplaA > gamesDuplaB ? "A" : gamesDuplaB > gamesDuplaA ? "B" : null;

  partida.duplaA.jogadores.forEach((j) => {
    novoTorneio.ranking[j.id].games += gamesDuplaA;
    if (novaVencedora === "A") novoTorneio.ranking[j.id].vitorias += 1;
    if (gamesDuplaA === 0) novoTorneio.ranking[j.id].zerados += 1; // ✅
  });

  partida.duplaB.jogadores.forEach((j) => {
    novoTorneio.ranking[j.id].games += gamesDuplaB;
    if (novaVencedora === "B") novoTorneio.ranking[j.id].vitorias += 1;
    if (gamesDuplaB === 0) novoTorneio.ranking[j.id].zerados += 1; // ✅
  });

  // avançar rodada
  const rodadaAtual = novoTorneio.jogos.find((r) => r.numero === novoTorneio.rodadaAtual);
  if (rodadaAtual && rodadaAtual.partidas.every((p) => p.placar && p.placar.duplaA !== null)) {
    novoTorneio.rodadaAtual = Math.min(novoTorneio.rodadaAtual + 1, novoTorneio.jogos.length);
  }

  return novoTorneio;
}

export function finalizarTorneio(torneio) {
  return { ...torneio, finalizado: true };
}

export function getRankingOrdenado(torneio) {
  const porVitorias = torneio.config?.criterioRanking !== "games";

  return Object.values(torneio.ranking).sort((a, b) => {
    const primario = porVitorias ? b.vitorias - a.vitorias : b.games - a.games;
    if (primario !== 0) return primario;

    const secundario = porVitorias ? b.games - a.games : b.vitorias - a.vitorias;
    if (secundario !== 0) return secundario;

    if (a.zerados !== b.zerados) return a.zerados - b.zerados;
    return a.jogador.nome.localeCompare(b.jogador.nome);
  });
}
