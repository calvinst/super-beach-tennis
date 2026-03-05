export function gerarRodadas(jogadores, config, tentativas = 5000) {
  const maxConfrontos = config.qtdJogadores === 12 ? 3 : (config.maxConfrontos || 3);
  const quadras = config.qtdQuadras || 3;

  console.log("Gerando rodadas com config:", config);

  if (config.qtdJogadores === 8) {
    if (jogadores.length !== 8) {
      throw new Error("Super 8 precisa exatamente 8 jogadores.");
    }

    // Super 8: 7 rodadas com 2 partidas cada (independente de quadras,
    // pois são apenas 8 jogadores — sempre 2 partidas simultâneas no máximo)
    const PARTIDAS_POR_RODADA = Math.min(quadras, 2);
    const TOTAL_RODADAS = 7;

    function chaveDupla(a, b) {
      return [a.id, b.id].sort((x, y) => x - y).join("-");
    }

    function criarEstruturas() {
      const duplasUsadas = new Set();
      const parceirosUsados = {};
      const confrontos = {};

      jogadores.forEach((j1) => {
        parceirosUsados[j1.id] = new Set();
        confrontos[j1.id] = {};
        jogadores.forEach((j2) => {
          if (j1.id !== j2.id) {
            confrontos[j1.id][j2.id] = 0;
          }
        });
      });

      return { duplasUsadas, parceirosUsados, confrontos };
    }

    function gerarUmaSolucao() {
      const { duplasUsadas, parceirosUsados, confrontos } = criarEstruturas();
      const rodadas = [];
      let partidaId = 1;

      for (let r = 0; r < TOTAL_RODADAS; r++) {
        const usadosNaRodada = new Set();
        const partidas = [];

        function backtrack() {
          if (partidas.length === PARTIDAS_POR_RODADA) return true;

          let livres = jogadores.filter((j) => !usadosNaRodada.has(j.id));
          livres = [...livres].sort(() => Math.random() - 0.5);

          for (let i = 0; i < livres.length; i++) {
            for (let j = i + 1; j < livres.length; j++) {
              const a = livres[i];
              const b = livres[j];

              const dupla1Key = chaveDupla(a, b);
              if (duplasUsadas.has(dupla1Key)) continue;
              if (parceirosUsados[a.id].has(b.id)) continue;

              for (let k = 0; k < livres.length; k++) {
                if (k === i || k === j) continue;

                for (let l = k + 1; l < livres.length; l++) {
                  if (l === i || l === j || l === k) continue;

                  const c = livres[k];
                  const d = livres[l];

                  const dupla2Key = chaveDupla(c, d);
                  if (duplasUsadas.has(dupla2Key)) continue;
                  if (parceirosUsados[c.id].has(d.id)) continue;

                  const ids = [a.id, b.id, c.id, d.id];
                  if (new Set(ids).size !== 4) continue;

                  const pares = [
                    [a.id, c.id],
                    [a.id, d.id],
                    [b.id, c.id],
                    [b.id, d.id],
                  ];

                  let invalido = false;
                  for (const [x, y] of pares) {
                    if (confrontos[x][y] >= maxConfrontos) {
                      invalido = true;
                      break;
                    }
                  }
                  if (invalido) continue;

                  // aplicar
                  usadosNaRodada.add(a.id);
                  usadosNaRodada.add(b.id);
                  usadosNaRodada.add(c.id);
                  usadosNaRodada.add(d.id);

                  duplasUsadas.add(dupla1Key);
                  duplasUsadas.add(dupla2Key);

                  parceirosUsados[a.id].add(b.id);
                  parceirosUsados[b.id].add(a.id);
                  parceirosUsados[c.id].add(d.id);
                  parceirosUsados[d.id].add(c.id);

                  pares.forEach(([x, y]) => {
                    confrontos[x][y]++;
                    confrontos[y][x]++;
                  });

                  partidas.push({
                    id: partidaId++,
                    duplaA: { jogadores: [a, b] },
                    duplaB: { jogadores: [c, d] },
                    placar: { duplaA: null, duplaB: null },
                  });

                  if (backtrack()) return true;

                  // rollback
                  partidas.pop();
                  usadosNaRodada.delete(a.id);
                  usadosNaRodada.delete(b.id);
                  usadosNaRodada.delete(c.id);
                  usadosNaRodada.delete(d.id);

                  duplasUsadas.delete(dupla1Key);
                  duplasUsadas.delete(dupla2Key);

                  parceirosUsados[a.id].delete(b.id);
                  parceirosUsados[b.id].delete(a.id);
                  parceirosUsados[c.id].delete(d.id);
                  parceirosUsados[d.id].delete(c.id);

                  pares.forEach(([x, y]) => {
                    confrontos[x][y]--;
                    confrontos[y][x]--;
                  });
                }
              }
            }
          }

          return false;
        }

        if (!backtrack()) return null;

        rodadas.push({
          numero: r + 1,
          partidas,
        });
      }

      return rodadas;
    }

    for (let t = 0; t < tentativas; t++) {
      const solucao = gerarUmaSolucao();
      if (solucao) return solucao;
    }

    throw new Error("Não foi possível gerar uma distribuição válida.");

  } else if (config.qtdJogadores === 12) {
    if (jogadores.length !== 12) {
      throw new Error("Super 12 precisa exatamente 12 jogadores.");
    }

    // Total de partidas sempre 33 (11 rodadas × 3 partidas)
    // Com 3 quadras: 11 rodadas de 3 partidas
    // Com 2 quadras: 16 rodadas de 2 partidas + 1 rodada de 1 partida (17 total)
    const TOTAL_PARTIDAS = 33;
    const PARTIDAS_POR_RODADA = quadras; // 2 ou 3
    const TOTAL_RODADAS = quadras === 2 ? 17 : 11;

    function chaveDupla(a, b) {
      return [a.id, b.id].sort().join("-");
    }

    function criarEstruturas() {
      const duplasUsadas = new Set();
      const parceirosUsados = {};
      const confrontos = {};

      jogadores.forEach((j1) => {
        parceirosUsados[j1.id] = new Set();
        confrontos[j1.id] = {};
        jogadores.forEach((j2) => {
          if (j1.id !== j2.id) confrontos[j1.id][j2.id] = 0;
        });
      });

      return { duplasUsadas, parceirosUsados, confrontos };
    }

    function gerarUmaSolucao() {
      const { duplasUsadas, parceirosUsados, confrontos } = criarEstruturas();
      const rodadas = [];
      let partidaId = 1;
      let partidasGeradas = 0;

      function scoreDupla(a, b) {
        return parceirosUsados[a.id].has(b.id) ? Infinity : 0;
      }

      function scoreConfronto(a, b, c, d) {
        if (confrontos[a.id][c.id] >= maxConfrontos) return Infinity;
        if (confrontos[a.id][d.id] >= maxConfrontos) return Infinity;
        if (confrontos[b.id][c.id] >= maxConfrontos) return Infinity;
        if (confrontos[b.id][d.id] >= maxConfrontos) return Infinity;

        return confrontos[a.id][c.id] + confrontos[a.id][d.id] + confrontos[b.id][c.id] + confrontos[b.id][d.id];
      }

      for (let r = 0; r < TOTAL_RODADAS; r++) {
        // Última rodada com 2 quadras tem só 1 partida (33 = 16×2 + 1)
        const partidasDessaRodada = (quadras === 2 && r === 16) ? 1 : PARTIDAS_POR_RODADA;

        const usadosNaRodada = new Set();
        const partidas = [];

        function getDuplasValidas(livres) {
          const duplas = [];
          for (let i = 0; i < livres.length; i++) {
            for (let j = i + 1; j < livres.length; j++) {
              const a = livres[i];
              const b = livres[j];
              if (duplasUsadas.has(chaveDupla(a, b))) continue;
              if (scoreDupla(a, b) === Infinity) continue;
              duplas.push({ a, b, score: Math.random() });
            }
          }
          return duplas.sort((x, y) => x.score - y.score);
        }

        function backtrack() {
          if (partidas.length === partidasDessaRodada) return true;

          const livres = jogadores.filter((j) => !usadosNaRodada.has(j.id));
          const duplas = getDuplasValidas(livres);

          for (const { a, b } of duplas) {
            if (usadosNaRodada.has(a.id) || usadosNaRodada.has(b.id)) continue;

            const dupla1Key = chaveDupla(a, b);
            const livresRestantes = livres.filter((j) => j.id !== a.id && j.id !== b.id);

            const adversarias = [];
            for (let k = 0; k < livresRestantes.length; k++) {
              for (let l = k + 1; l < livresRestantes.length; l++) {
                const c = livresRestantes[k];
                const d = livresRestantes[l];

                if (duplasUsadas.has(chaveDupla(c, d))) continue;
                if (parceirosUsados[c.id].has(d.id)) continue;

                const score = scoreConfronto(a, b, c, d);
                if (score === Infinity) continue;

                adversarias.push({ c, d, score: score + Math.random() * 0.5 });
              }
            }

            adversarias.sort((x, y) => x.score - y.score);

            for (const { c, d } of adversarias) {
              const dupla2Key = chaveDupla(c, d);

              usadosNaRodada.add(a.id);
              usadosNaRodada.add(b.id);
              usadosNaRodada.add(c.id);
              usadosNaRodada.add(d.id);

              duplasUsadas.add(dupla1Key);
              duplasUsadas.add(dupla2Key);

              parceirosUsados[a.id].add(b.id);
              parceirosUsados[b.id].add(a.id);
              parceirosUsados[c.id].add(d.id);
              parceirosUsados[d.id].add(c.id);

              const pares = [
                [a.id, c.id],
                [a.id, d.id],
                [b.id, c.id],
                [b.id, d.id],
              ];
              pares.forEach(([x, y]) => {
                confrontos[x][y]++;
                confrontos[y][x]++;
              });

              partidas.push({
                id: partidaId++,
                duplaA: { jogadores: [a, b] },
                duplaB: { jogadores: [c, d] },
                placar: { duplaA: null, duplaB: null },
              });

              if (backtrack()) return true;

              // Rollback
              partidas.pop();
              usadosNaRodada.delete(a.id);
              usadosNaRodada.delete(b.id);
              usadosNaRodada.delete(c.id);
              usadosNaRodada.delete(d.id);

              duplasUsadas.delete(dupla1Key);
              duplasUsadas.delete(dupla2Key);

              parceirosUsados[a.id].delete(b.id);
              parceirosUsados[b.id].delete(a.id);
              parceirosUsados[c.id].delete(d.id);
              parceirosUsados[d.id].delete(c.id);

              pares.forEach(([x, y]) => {
                confrontos[x][y]--;
                confrontos[y][x]--;
              });
            }
          }

          return false;
        }

        if (!backtrack()) return null;

        partidasGeradas += partidas.length;
        rodadas.push({ numero: r + 1, partidas });
      }

      return rodadas;
    }

    for (let t = 0; t < tentativas; t++) {
      const solucao = gerarUmaSolucao();
      if (solucao) return solucao;
    }

    throw new Error("Não foi possível gerar uma distribuição válida para Super 12.");
  }
}