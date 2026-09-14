import { Workspace } from "@/components/content/workspace";

export default async function ContentWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Workspace id={id} />;
}
