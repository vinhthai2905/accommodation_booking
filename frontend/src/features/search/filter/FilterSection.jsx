export default function FilterSection({ title, items }) {
  return (
    <section>
      <h3>{title}</h3>

      <div>
        {items.map((item) => (
          <FilterItem
            key={item.label}
            label={item.label}
            count={item.count}
            subtext={item.subtext}
          />
        ))}
      </div>
    </section>
  );
}