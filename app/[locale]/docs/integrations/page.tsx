import { redirect } from "@/i18n/navigation";
import { INTEGRATION_SLUGS } from "@/lib/docs-config";

// The integrations landing grid has been retired: hitting /docs/integrations
// now drops the user straight into the first integration's docs, where the
// left sidebar handles navigation to every other integration.
export default async function IntegrationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: `/docs/integrations/${INTEGRATION_SLUGS[0]}`, locale });
}
