import type { PageServerLoad } from './$types';

interface MixcloudCloudcast {
  key: string;
  url: string;
  name: string;
  created_time: string;
  pictures: {
    extra_large?: string;
    '640wx640h'?: string;
    large?: string;
    medium?: string;
  };
  tags: Array<{ name: string }>;
}

interface MixcloudResponse {
  data: MixcloudCloudcast[];
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const res = await fetch(
      'https://api.mixcloud.com/RadioRoza/cloudcasts/?limit=16&metadata=1',
    );
    const json: MixcloudResponse = await res.json();

    const shows = json.data.map((c) => ({
      href: c.url,
      title: c.name,
      date: new Date(c.created_time).toLocaleDateString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      image: c.pictures['640wx640h'] ?? c.pictures.extra_large ?? c.pictures.large,
      tags: c.tags.slice(0, 3).map((t) => t.name),
      mixcloudKey: c.key,
    }));

    return { shows };
  } catch {
    return { shows: [] };
  }
};
