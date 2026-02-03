import api from '../lib/axiosConfig';

export const onboardingService = {
    completeOnboarding: async (email: string, firstName: string, lastName: string, immigrationGoal: string, partnerEmail: string) => {
        const response = await api.put(`/user/onboarding`, {
            email,
            firstName,
            lastName,
            immigrationGoal,
            partnerEmail
        });
        return response.data;
    },

    searchPartners: async (searchTerm: string) => {
        const response = await api.get(`/user/search-partners`, {
            params: { query: searchTerm }
        });
        return response.data.partners;
    }
}

