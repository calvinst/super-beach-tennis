import { gerarRodadas } from "./geradorDeRodadas";

export function criarTorneio(jogadores, config) {
  const jogos = gerarRodadas(jogadores, config);

  const ranking = {};
  jogadores.forEach((j) => {
    ranking[j.id] = {
      jogador: j,
      games: 0,
    };
  });

  return {
    jogadores,
    jogos, // 👈 lista linear
    ranking,
    finalizado: false,
  };
}

export function registrarResultado(torneio, partidaId, gamesDuplaA, gamesDuplaB) {
  const novoTorneio = {
    ...torneio,
    jogos: torneio.jogos.map((r) => ({
      ...r,
      partidas: r.partidas.map((p) => ({ ...p })),
    })),
    ranking: { ...torneio.ranking },
  };

  let partida = null;

  // localizar partida
  novoTorneio.jogos.forEach((rodada) => {
    rodada.partidas.forEach((p) => {
      if (p.id === partidaId) {
        partida = p;
      }
    });
  });

  if (!partida) return novoTorneio;

  // 🔁 remover games antigos (edição)
  if (partida.placar && partida.placar.duplaA !== null) {
    partida.duplaA.jogadores.forEach((j) => {
      novoTorneio.ranking[j.id].games -= partida.placar.duplaA;
    });

    partida.duplaB.jogadores.forEach((j) => {
      novoTorneio.ranking[j.id].games -= partida.placar.duplaB;
    });
  }

  // salvar novo placar
  partida.placar = {
    duplaA: gamesDuplaA,
    duplaB: gamesDuplaB,
  };

  // ➕ somar novos games
  partida.duplaA.jogadores.forEach((j) => {
    novoTorneio.ranking[j.id].games += gamesDuplaA;
  });

  partida.duplaB.jogadores.forEach((j) => {
    novoTorneio.ranking[j.id].games += gamesDuplaB;
  });

  // ⏭️ avançar rodada
  const rodadaAtual = novoTorneio.jogos.find((r) => r.numero === novoTorneio.rodadaAtual);

  if (rodadaAtual && rodadaAtual.partidas.every((p) => p.placar && p.placar.duplaA !== null)) {
    novoTorneio.rodadaAtual = Math.min(novoTorneio.rodadaAtual + 1, novoTorneio.jogos.length);
  }

  return novoTorneio;
}

export function finalizarTorneio(torneio) {
  return {
    ...torneio,
    finalizado: true,
  };
}

export function getRankingOrdenado(torneio) {
  return Object.values(torneio.ranking).sort((a, b) => {
    if (b.games !== a.games) return b.games - a.games;
    return a.jogador.nome.localeCompare(b.jogador.nome); // desempate simples
  });
}
