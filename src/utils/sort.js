/**
 * Sort movies by different criteria
 */

export const sortByRating = (movies, ascending = false) => {
    return [...movies].sort((a, b) => {
        const ratingA = a.vote_average || 0;
        const ratingB = b.vote_average || 0;
        return ascending ? ratingA - ratingB : ratingB - ratingA;
    });
};

export const sortByReleaseDate = (movies, ascending = false) => {
    return [...movies].sort((a, b) => {
        const dateA = new Date(a.release_date || '1900-01-01');
        const dateB = new Date(b.release_date || '1900-01-01');
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

export const sortByTitle = (movies, ascending = true) => {
    return [...movies].sort((a, b) => {
        const titleA = (a.title || '').toLowerCase();
        const titleB = (b.title || '').toLowerCase();
        if (ascending) {
            return titleA.localeCompare(titleB);
        } else {
            return titleB.localeCompare(titleA);
        }
    });
};

export const sortByPopularity = (movies, ascending = false) => {
    return [...movies].sort((a, b) => {
        const popA = a.popularity || 0;
        const popB = b.popularity || 0;
        return ascending ? popA - popB : popB - popA;
    });
};

export const SORT_OPTIONS = {
    RATING_DESC: 'rating_desc',
    RATING_ASC: 'rating_asc',
    DATE_DESC: 'date_desc',
    DATE_ASC: 'date_asc',
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    POPULARITY_DESC: 'popularity_desc',
};

export const applySorting = (movies, sortOption) => {
    switch (sortOption) {
        case SORT_OPTIONS.RATING_DESC:
            return sortByRating(movies, false);
        case SORT_OPTIONS.RATING_ASC:
            return sortByRating(movies, true);
        case SORT_OPTIONS.DATE_DESC:
            return sortByReleaseDate(movies, false);
        case SORT_OPTIONS.DATE_ASC:
            return sortByReleaseDate(movies, true);
        case SORT_OPTIONS.TITLE_ASC:
            return sortByTitle(movies, true);
        case SORT_OPTIONS.TITLE_DESC:
            return sortByTitle(movies, false);
        case SORT_OPTIONS.POPULARITY_DESC:
            return sortByPopularity(movies, false);
        default:
            return movies;
    }
};
