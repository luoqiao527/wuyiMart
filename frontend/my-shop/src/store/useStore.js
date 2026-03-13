import { create } from 'zustand';

const useStore = create((set) => ({
    userInfo: null, // { id: 1, username: 'test', role: 2 } (0管理员, 1商家, 2用户)
    token: null,
    login: (userData, token) => set({ userInfo: userData, token }),
    logout: () => set({ userInfo: null, token: null }),
}));

export default useStore;
