type TocItem = {
  value: string;
  url: string;
  depth: number;
  children?: TocItem[];
};

function nest(items: TocItem[]) {
  const roots: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const item of items) {
    const current = { ...item };
    while (stack.length && stack[stack.length - 1].depth >= current.depth) {
      stack.pop();
    }
    const parent = stack[stack.length - 1];
    if (parent) {
      (parent.children ||= []).push(current);
    } else {
      roots.push(current);
    }
    stack.push(current);
  }

  return roots;
}

function TocList({
  items,
  ulClassName,
  liClassName,
}: {
  items: TocItem[];
  ulClassName: string;
  liClassName: string;
}) {
  if (!items.length) return null;
  return (
    <ul className={ulClassName}>
      {items.map((item) => (
        <li key={item.url} className={liClassName}>
          <a href={item.url}>{item.value}</a>
          {item.children && (
            <TocList
              items={item.children}
              ulClassName={ulClassName}
              liClassName={liClassName}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function TOCInline({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = "",
  collapse = false,
  ulClassName = "",
  liClassName = "",
}: {
  toc: TocItem[];
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
  ulClassName?: string;
  liClassName?: string;
}) {
  const excluded = Array.isArray(exclude) ? exclude.join("|") : exclude;
  const pattern = excluded ? new RegExp(`^(${excluded})$`, "i") : null;
  const items = nest(
    toc.filter(
      (item) =>
        item.depth >= fromHeading &&
        item.depth <= toHeading &&
        !pattern?.test(item.value),
    ),
  );
  const list = (
    <TocList
      items={items}
      ulClassName={ulClassName}
      liClassName={liClassName}
    />
  );

  if (!asDisclosure) return list;
  return (
    <details open={!collapse}>
      <summary className="ml-6 pt-2 pb-2 text-xl font-bold">
        Table of Contents
      </summary>
      <div className="ml-6">{list}</div>
    </details>
  );
}
