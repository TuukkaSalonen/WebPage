export const validateSnakeScoreRequest = (user: string, score: number): boolean => {
    if (typeof user === 'string' && user.trim().length > 0 && user.length <= 20) {
        if (typeof score === 'number' && score >= 0 && score <= 9999) {
            return true;
        }
    }
    return false;
}