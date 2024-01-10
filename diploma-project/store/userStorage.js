import { create } from "zustand";
import {User} from "../services/user";

export const useUserStore = create((set) => ({
        user: new User(),
        setUser: (newUser) => set(() => ({ user: newUser })),
        setTheme: (newTheme) => set((state) => ({ user: { ...state.user, theme: newTheme } })),
}));