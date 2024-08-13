import axios from 'axios';

interface fetchPostsProps {
  token: string;
}

export const fetchPosts = async ({ token }: fetchPostsProps) => {
  const response = await axios({
    method: 'GET',
    url: 'https://untitled-twkmuar27a-uc.a.run.app/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return response;
};
