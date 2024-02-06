import { create } from "zustand";
import {User} from "../services/user";

export const useUserStore = create((set) => ({
        user: new User(),
        setUser: (newUser) => set(() => ({ user: newUser })),
        isTouchEnabled: null,
        setIsTouchEnabled: (newValue) => set(() => ({ isTouchEnabled: newValue })),
}));