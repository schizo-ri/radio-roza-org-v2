import { LISTENNOTES_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
  const cursor = url.searchParams.get('next_episode_pub_date');
  let apiUrl = `https://listen-api.listennotes.com/api/v2/podcasts/${params.id}?sort=recent_first`;
  if (cursor) apiUrl += `&next_episode_pub_date=${cursor}`;

  const res = await fetch(apiUrl, { headers: { 'X-ListenAPI-Key': LISTENNOTES_API_KEY } });

  if (!res.ok) return json({ error: true }, { status: res.status });

  const data = await res.json();
  return json({
    episodes: data.episodes ?? [],
    next_episode_pub_date: data.next_episode_pub_date ?? null,
  });
}
