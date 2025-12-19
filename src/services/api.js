const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    async fetchPlans() {
        try {
            const response = await fetch(`${API_BASE_URL}/plans`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            return [];
        }
    }

    async fetchUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/users?_limit=5`);
            const data = await response.json();

            return data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async createRecharge(rechargeData) {
        try {
            const response = await fetch(`${API_BASE_URL}/recharges`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rechargeData),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating recharge:', error);
            throw error;
        }
    }

    async createSubscription(subscriptionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptionData),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }

    async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    }
}

export default new ApiService();