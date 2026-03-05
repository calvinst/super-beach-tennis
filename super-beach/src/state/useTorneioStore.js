import { create } from "zustand";
import {
  criarTorneio,
  registrarResultado,
  finalizarTorneio,
} from "../services/torneioService";

export const useTorneioStore = create((set) => ({
  torneio: null,
  config: null, // 👈 NOVO

  setConfig: (config) => set({ config }), // 👈 NOVO

  iniciarTorneio: (jogadores) =>
    set((state) => ({
      torneio: criarTorneio(jogadores, state.config), // 👈 usa config do store
    })),

  registrarResultado: (partidaId, gamesA, gamesB) =>
    set((state) => ({
      torneio: registrarResultado(state.torneio, partidaId, gamesA, gamesB),
    })),

  finalizarTorneio: () =>
    set((state) => ({
      torneio: finalizarTorneio(state.torneio),
    })),

  resetarTorneio: () =>
    set({
      torneio: null,
      config: null, // 👈 opcional resetar config também
    }),
}));
