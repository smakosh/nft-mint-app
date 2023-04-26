import { cookies } from 'next/headers';

const getUser = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return undefined;
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const meResponse = await fetch('https://api.unsplash.com/me', headers);

  if (!meResponse.ok) {
    return undefined;
  }

  const me = await meResponse.json();

  return me;
};

export default getUser;
