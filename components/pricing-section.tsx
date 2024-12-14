import { Check, Trash2, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PricingSection() {
  return (
    <section className='py-20 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
          {/* Basic Plan */}
          <Card className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 p-8'>
            <CardHeader className='p-0 space-y-6'>
              <div className='w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#2a3744] flex items-center justify-center'>
                <Trash2 className='w-6 h-6 text-black dark:text-white' />
              </div>
              <div className='space-y-2'>
                <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                  Basic Plan
                </CardTitle>
                <div className='flex items-baseline gap-1'>
                  <span className='text-3xl font-semibold text-black dark:text-white'>
                    $20
                  </span>
                  <span className='text-gray-500 dark:text-gray-400'>
                    /month
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0 mt-8'>
              <ul className='space-y-5'>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Up to 50 practice questions</span>
                </li>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Basic interview guides</span>
                </li>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Community access</span>
                </li>
              </ul>
              <div className='mt-8'>
                <Button className='w-full bg-black hover:bg-black/90 text-white rounded-full h-12 dark:bg-white dark:text-black dark:hover:bg-white/90'>
                  Current plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 p-8'>
            <CardHeader className='p-0 space-y-6'>
              <div className='w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#2a3744] flex items-center justify-center'>
                <MonitorPlay className='w-6 h-6 text-black dark:text-white' />
              </div>
              <div className='space-y-2'>
                <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                  Pro Plan
                </CardTitle>
                <div className='flex items-baseline gap-1'>
                  <span className='text-3xl font-semibold text-black dark:text-white'>
                    $200
                  </span>
                  <span className='text-gray-500 dark:text-gray-400'>
                    /month
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0 mt-8'>
              <ul className='space-y-5'>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Up to 500 practice questions</span>
                </li>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Advanced interview guides</span>
                </li>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>1-on-1 mock interviews</span>
                </li>
                <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                  <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span>Priority support</span>
                </li>
              </ul>
              <div className='mt-8'>
                <Button className='w-full bg-white hover:bg-white/90 text-black rounded-full h-12 dark:bg-black dark:text-white dark:hover:bg-black/90'>
                  Get Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
