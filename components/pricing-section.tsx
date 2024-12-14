import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Simple, transparent pricing</h2>
          <p className="text-blue-600/70">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-blue-900">Free</CardTitle>
              <CardDescription className="text-blue-600">Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-900">$0</span>
                <span className="text-blue-600/70">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">100 practice questions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Basic interview guides</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Community access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-blue-900">Premium</CardTitle>
              <CardDescription className="text-blue-600">For serious candidates</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-900">$10</span>
                <span className="text-blue-600/70">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Unlimited practice questions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Advanced interview guides</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">1-on-1 mock interviews</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Performance analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-blue-900">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Get Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}