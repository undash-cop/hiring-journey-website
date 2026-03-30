type RelatablePost = {
  id: number;
  categorySlug: string;
  category: string;
  date: string;
};

/**
 * Related posts: same category slug first, then same display category, then recent global.
 * Excludes the current post and de-duplicates by id.
 */
export function getRelatedBlogPosts<T extends RelatablePost>(
  current: T,
  all: T[],
  limit = 3
): T[] {
  const others = all.filter((p) => p.id !== current.id);
  const byDateDesc = (a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();

  const sameSlug = [...others.filter((p) => p.categorySlug === current.categorySlug)].sort(byDateDesc);
  const sameLabel = [...others.filter((p) => p.category === current.category && p.categorySlug !== current.categorySlug)].sort(
    byDateDesc
  );
  const recent = [...others].sort(byDateDesc);

  const picked: T[] = [];
  const seen = new Set<number>();

  const takeFrom = (list: T[]) => {
    for (const p of list) {
      if (picked.length >= limit) return;
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      picked.push(p);
    }
  };

  takeFrom(sameSlug);
  takeFrom(sameLabel);
  takeFrom(recent);

  return picked.slice(0, limit);
}
