import { messages } from "@/generated/prisma/client";
import { formatDateTime } from "@/lib/utils";

export default function UserChatCard({ message }: { message: messages }) {
  return (
    <div className="md:max-w-175 max-w-full">
      <p className="py-2 px-3 bg-primary rounded-lg w-fit text-primary-foreground whitespace-break-spaces">
        {message.content}
      </p>
      <div className="flex group justify-end mt-1 px-2 text-xs font-medium text-muted-foreground">
        <p>{formatDateTime(message.created_at)}</p>
      </div>
    </div>
  );
}
