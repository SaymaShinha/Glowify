export default function CategoryForm() {
  return (
    <form className="flex gap-2">
      <input className="input input-bordered" placeholder="Category name" />
      <button className="btn btn-primary">Add</button>
    </form>
  );
}