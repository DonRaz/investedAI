// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { PortfolioLoanCalculator } from "@/components/calculators/PortfolioLoanCalculator";
// import { Info } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold tracking-tight">Investment Calculator Suite</h1>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Make informed investment decisions with our comprehensive calculator tools.
//             Compare different strategies and understand the long-term implications of your choices.
//           </p>
//         </div>

//         <Tabs defaultValue="portfolio-loan" className="space-y-4">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="portfolio-loan">Portfolio Loan vs. Selling</TabsTrigger>
//             <TabsTrigger value="compound-interest">Compound Interest</TabsTrigger>
//             <TabsTrigger value="tax-efficiency">Tax Efficiency</TabsTrigger>
//           </TabsList>

//           <TabsContent value="portfolio-loan">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-start gap-2 mb-6">
//                   <Info className="w-5 h-5 mt-1 text-blue-500" />
//                   <p className="text-sm text-muted-foreground">
//                     Compare the benefits of borrowing against your portfolio versus selling stocks.
//                     This calculator helps you understand the long-term impact of each strategy on your wealth.
//                   </p>
//                 </div>
//                 <PortfolioLoanCalculator />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="compound-interest">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-center h-[400px]">
//                   <p className="text-muted-foreground">Coming soon...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="tax-efficiency">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-center h-[400px]">
//                   <p className="text-muted-foreground">Coming soon...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }