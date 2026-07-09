import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-10 text-center">
        <CardTitle>{title}</CardTitle>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}
