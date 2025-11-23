// Placeholder for a global auth store (e.g., Zustand)
type User = { id: string; name: string } | null;

const authStore = {
  user: null as User,
  setUser(user: User) {
    this.user = user;
  },
};

export default authStore;
