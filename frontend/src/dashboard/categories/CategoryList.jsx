export default function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((cat) => (
        <div key={cat._id} className="p-3 border mb-2 rounded">
          {cat.name}
        </div>
      ))}
    </div>
  );
}