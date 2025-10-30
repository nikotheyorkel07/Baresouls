interface Base44Client {
  auth: {
    me: () => Promise<{
      wellness_theme?: string;
      is_dark_mode?: boolean;
      [key: string]: any;
    }>;
    updateMe: (data: any) => Promise<any>;
  };
}

export const base44: Base44Client = {
  auth: {
    me: async () => {
      // Implementation would go here
      return {};
    },
    updateMe: async (data) => {
      // Implementation would go here
      return data;
    }
  }
};