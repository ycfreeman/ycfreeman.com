import { allAuthors } from "content-collections";
import type { Author } from "content-collections";
import AuthorLayout from "@/layouts/AuthorLayout";
import { coreContent } from "@/lib/content";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === "default") as Author;
  const mainContent = coreContent(author);
  const MdxContent = author.mdxContent;

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MdxContent />
      </AuthorLayout>
    </>
  );
}
