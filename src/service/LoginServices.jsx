// RoomService.jsx
export const loginUser = async (username, password) => {
    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const fetchUserData = async (accessToken) => {
    try {
        const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error fetching data:", data);
            throw new Error(`Failed to fetch user data: ${data.message || response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};