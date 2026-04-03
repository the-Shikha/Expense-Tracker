let currentUser = null;
let currentRole = 'viewer';

export const authService = {
  async signUp(email, password, role = 'viewer') {
    // mock signup
    currentUser = {
      id: Date.now().toString(),
      email,
    };
    currentRole = role;

    return { user: currentUser };
  },

  async signIn(email, password) {
    // mock login
    currentUser = {
      id: Date.now().toString(),
      email,
    };

    return { user: currentUser };
  },

  async signOut() {
    currentUser = null;
    currentRole = 'viewer';
  },

  async getCurrentUser() {
    return currentUser;
  },

  async getUserRole(userId) {
    return currentRole;
  },

  async updateUserRole(userId, role) {
    currentRole = role;
  },
};