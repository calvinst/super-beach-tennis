import { create } from "zustand";
import {
  criarTorneio,
  registrarResultado,
  finalizarTorneio,
} from "../services/torneioService";

export const useTorneioStore = create((set) => ({
  torneio: null,
  config: null,

  setConfig: (config) => set({ config }),
  iniciarTorneio: (jogadores) =>
    set((state) => ({
      torneio: criarTorneio(jogadores, state.config),
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
      config: null,
    }),
}));
