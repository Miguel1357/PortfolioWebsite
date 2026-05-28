type SectionProps<T> = {
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
};

export default function Section<T>({
  title,
  data,
  renderItem,
}: SectionProps<T>) {
  return (
    <section>
      <h2 className="text-2xl fond-semibold mb-6">{title}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((item: any) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}
