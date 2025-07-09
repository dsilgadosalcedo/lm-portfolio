export type PortfolioItem = {
  id: string;
  name: string;
  image?: string;
  order?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBySelect(items: any[]) {
  const grouped: Record<string, PortfolioItem[]> = {};

  for (const page of items) {
    const props = page.properties;

    const select = props.Select.select?.name ?? "Uncategorized";
    const name = props.Name.title[0]?.plain_text ?? "Untitled";

    const files = props["Files & media"]?.files ?? [];
    const image =
      files[0]?.type === "file"
        ? files[0].file.url
        : files[0]?.type === "external"
        ? files[0].external.url
        : undefined;

    const orderValue = props.Order?.number ?? Infinity;

    const entry: PortfolioItem = {
      id: page.id,
      name,
      ...(image && { image }),
      ...(orderValue !== Infinity && { order: orderValue }),
    };

    if (!grouped[select]) grouped[select] = [];
    grouped[select].push(entry);
  }

  // Sort each group by `order`
  for (const key in grouped) {
    grouped[key].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  }

  return grouped;
}
