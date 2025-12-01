export function filterMovies(movies, query) {
  if (!Array.isArray(movies)) return [];
  if (!query) return movies;
  const q = query.trim().toLowerCase();
  return movies.filter((m) =>
    [m.title, m.original_title, m.overview]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q))
  );
}


