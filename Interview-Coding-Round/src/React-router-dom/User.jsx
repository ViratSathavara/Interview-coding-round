import { useParams } from 'react-router-dom';

export default function User() {
  const { username } = useParams();
  return <h2>👤 Hello, {username}!</h2>;
}
