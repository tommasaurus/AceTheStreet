import { TestInterface } from "@/components/dashboard/study/test/TestInterface";
import { TestSetup } from "@/components/dashboard/study/test/TestSetup";

const bankQuestions = {
  "goldman-sachs-1": {
    name: "Goldman Sachs",
    questions: [
      {
        id: 1,
        type: "Technical",
        question: "What is WACC?",
        answer:
          "WACC (Weighted Average Cost of Capital) is the average rate a company pays to finance its assets, combining the cost of debt and equity weighted by their proportional use in the company's capital structure.",
      },
      {
        id: 2,
        type: "Technical",
        question: "How do you calculate Unlevered Free Cash Flow?",
        answer:
          "Unlevered Free Cash Flow = EBIT(1-Tax Rate) + Depreciation & Amortization - Changes in Working Capital - Capital Expenditures",
      },
      {
        id: 3,
        type: "Technical",
        question:
          "What happens to Enterprise Value when cash increases by $100?",
        answer:
          "Enterprise Value remains unchanged because cash is subtracted in the EV calculation. An increase in cash increases Equity Value but is then subtracted to get EV.",
      },
      {
        id: 4,
        type: "Technical",
        question: "What are the three main valuation methodologies?",
        answer:
          "The three main valuation methodologies are: 1) Comparable Company Analysis (Trading Comps), 2) Precedent Transaction Analysis (Deal Comps), and 3) Discounted Cash Flow Analysis (DCF)",
      },
      {
        id: 5,
        type: "Technical",
        question:
          "How does depreciation affect the three financial statements?",
        answer:
          "Depreciation decreases Net Income on the Income Statement, reduces PP&E on the Balance Sheet, and is added back on the Cash Flow Statement since it's a non-cash expense.",
      },
      {
        id: 6,
        type: "Technical",
        question:
          "What is the difference between Enterprise Value and Equity Value?",
        answer:
          "Enterprise Value = Equity Value + Total Debt - Cash & Cash Equivalents + Preferred Stock + Minority Interest. EV represents the entire value of a company's operations, while Equity Value represents only the shareholders' claim.",
      },
      {
        id: 7,
        type: "Technical",
        question: "What is working capital and how is it calculated?",
        answer:
          "Working Capital = Current Assets - Current Liabilities. It represents the capital needed for day-to-day operations. The main components are typically Accounts Receivable, Inventory, and Accounts Payable.",
      },
      {
        id: 8,
        type: "Technical",
        question:
          "What are the key differences between commercial banking and investment banking?",
        answer:
          "Commercial banks primarily take deposits and make loans, earning interest spread. Investment banks advise on capital raising, M&A, and restructuring, earning fee income. Commercial banks focus on credit risk while IBs focus on market and advisory services.",
      },
      {
        id: 9,
        type: "Technical",
        question: "What is the difference between a merger and an acquisition?",
        answer:
          "In a merger, two companies combine to form a new entity, typically as equals. In an acquisition, one company purchases another company and maintains control. Mergers are often structured as 'mergers of equals' while acquisitions can be friendly or hostile.",
      },
      {
        id: 10,
        type: "Technical",
        question: "How do you calculate EBITDA?",
        answer:
          "EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization. It's a measure of a company's operating performance before accounting for capital structure, tax jurisdiction, and capital investments.",
      },
    ],
  },
};

export default function BankPage({ params }: { params: { id: string } }) {
  const bank = bankQuestions[params.id];

  const handleStartTest = (settings: TestSettings) => {
    return (
      <TestInterface
        settings={settings}
        questions={bank.questions}
        onComplete={(results) => {
          // Handle test completion
        }}
      />
    );
  };

  return (
    <div>
      <TestSetup
        maxQuestions={bank.questions.length}
        onStartTest={handleStartTest}
      />
    </div>
  );
}
