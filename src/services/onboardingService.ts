import api from '../lib/axiosConfig';

export const onboardingService = {
    completeOnboarding: async (email: string, partner1Name: string, partner2Name: string, immigrationGoal: string) => {
        const response = await api.put(`/user/onboarding`, {
            email,
            partner1Name,
            partner2Name,
            immigrationGoal
        });
        return response.data;
    }
}


