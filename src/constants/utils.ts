export const API_KEY = '26a3281bfc65b39527447691941d6a707357a1278b1b2ec91742faec9de53ac8';
export const BASE_URL = '192.168.0.114:5000/api/v1/';

export const calculateTimeAgo = (createdAt: Date) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const differenceInMs = now.getTime() - createdDate.getTime();

    if (differenceInMs < 60000) {
        return "Just now"; // Less than a minute
    }

    const minutes = Math.floor(differenceInMs / 60000);
    if (minutes < 60) {
        return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
};
