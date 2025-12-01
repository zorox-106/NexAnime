import { Share } from 'react-native';

/**
 * Share movie information
 * @param {Object} movie - Movie object
 */
export const shareMovie = async (movie) => {
    try {
        const message = `Check out "${movie.title}"!\n\nRating: ${movie.vote_average}/10\n${movie.overview}\n\nFind it on IMDb: https://www.imdb.com/title/${movie.id}`;

        const result = await Share.share({
            message: message,
            title: `Check out ${movie.title}`,
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        console.error('Error sharing movie:', error);
    }
};
