// Validate snake score to have a valid user and score
export const validateSnakeScore = (user: string, score: number): boolean => {
    if (typeof user === 'string' && user.trim().length > 0 && user.length <= 20) {
        if (typeof score === 'number' && score >= 0 && score <= 9999) {
            return true;
        }
    }
    return false;
}

// Validate username
export const validateUsername = (username: string): boolean => {
    if (typeof username === 'string' && username.trim().length > 0 && username.length <= 12) {
        return true;
    }
    return false;
}