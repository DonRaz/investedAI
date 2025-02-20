"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";

export default function CompoundPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Compound Interest Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize the power of compound interest and see how your investments can grow over time.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <CompoundInterestCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}