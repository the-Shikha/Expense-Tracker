export const Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: '',
          user_id: '',
          title: '',
          amount: 0,
          type: 'income', 
          category: '',
          date: '',
          created_at: '',
        },
      },
      user_profiles: {
        Row: {
          id: '',
          role: 'viewer', 
          created_at: '',
        },
      },
    },
  },
};