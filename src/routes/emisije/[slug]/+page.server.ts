import { LISTENNOTES_API_KEY } from '$env/static/private';
import { shows } from '$lib/data/shows';

export async function load({ params }) {
  const show = shows.find((s) => s.href === `/emisije/${params.slug}`);

  if (!show?.listennotes_id) return {};

  const res = await fetch(
    `https://listen-api.listennotes.com/api/v2/podcasts/${show.listennotes_id}?sort=recent_first`,
    { headers: { 'X-ListenAPI-Key': LISTENNOTES_API_KEY } },
  );

  if (!res.ok) return {};

  const data = await res.json();
  return {
    lnEpisodes: data.episodes as LNEpisode[],
    lnNextCursor: (data.next_episode_pub_date ?? null) as number | null,
    lnPodcastId: show.listennotes_id,
  };
}

export interface LNEpisode {
  id: string;
  title: string;
  pub_date_ms: number;
  audio_length_sec: number;
  listennotes_url: string;
}
