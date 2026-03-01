// Base44 Client - stub implementation
// Replace with actual Base44 SDK configuration if needed

export const base44 = {
  entities: {
    ProjectEstimate: {
      create: async (data) => {
        console.log('Project estimate submitted:', data);
        // Simulate API delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, data });
          }, 1000);
        });
      }
    }
  }
};
