export default function UserActivity({ user }) {
  return (
    <div>
      <h2 className="font-bold">{user.name}</h2>
      <p>Orders: {user.orders?.length}</p>
      <p>Joined: {user.createdAt}</p>
    </div>
  );
}