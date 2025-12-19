import { documents } from "@/generated/prisma/client";
import pdf from "@/assets/pdf.svg";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";

export default function DocumentCard({ document }: { document: documents }) {
  return (
    <div className="md:max-w-175 max-w-full w-fit">
      <div className="rounded-lg p-2 px-4 bg-gray-200 dark:bg-zinc-800 w-fit">
        <div className="flex items-center gap-2">
          <Image src={pdf} alt="pdf" width={30} height={30} />
          <p className="font-semibold max-w-full truncate">{document.title}</p>
        </div>
        <p className="mt-2">Document is added to this chat</p>
      </div>
      <p className="text-xs mt-2 text-muted-foreground text-end">
        {formatDateTime(document.created_at)}
      </p>
    </div>
  );
}
