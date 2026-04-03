// Optional: reference structure (for understanding / mock usage)

export const Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: '',
          user_id: '',
          title: '',
          amount: 0,
          type: 'income', // or 'expense'
          category: '',
          date: '',
          created_at: '',
        },
      },
      user_profiles: {
        Row: {
          id: '',
          role: 'viewer', // or 'admin'
          created_at: '',
        },
      },
    },
  },
};