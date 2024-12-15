"use client";

import { usePathname } from "next/navigation";
import MatchGame from "./MatchGame";

// Sample questions - will be replaced with database content
const sampleQuestions = {
  banks: {
    "goldman-sachs-1": {
      questions: [
        {
          question: "What is WACC?",
          answer: "Weighted Average Cost of Capital",
        },
        { question: "What is CAPM?", answer: "Capital Asset Pricing Model" },
        { question: "What is DCF?", answer: "Discounted Cash Flow" },
        { question: "What is LBO?", answer: "Leveraged Buyout" },
        {
          question: "What is EBITDA?",
          answer:
            "Earnings Before Interest, Taxes, Depreciation, and Amortization",
        },
        { question: "What is ROE?", answer: "Return on Equity" },
        { question: "What is NPV?", answer: "Net Present Value" },
        { question: "What is IRR?", answer: "Internal Rate of Return" },
      ],
    },
    "morgan-stanley-1": {
      questions: [
        {
          question: "What is Working Capital?",
          answer: "Current Assets minus Current Liabilities",
        },
        {
          question: "What is Enterprise Value?",
          answer: "Market Cap plus Net Debt",
        },
        { question: "What is Beta?", answer: "Measure of Systematic Risk" },
        {
          question: "What is Goodwill?",
          answer: "Premium Paid Over Book Value in Acquisition",
        },
        {
          question: "What is Operating Leverage?",
          answer: "Degree of Fixed Costs in Business Model",
        },
        {
          question: "What is Free Cash Flow?",
          answer: "Operating Cash Flow minus CapEx",
        },
        {
          question: "What is Terminal Value?",
          answer: "Company's Value Beyond Forecast Period",
        },
        {
          question: "What is Accretion/Dilution?",
          answer: "Impact of Transaction on Earnings Per Share",
        },
      ],
    },
  },
  "m-and-i": {
    "valuation-1": {
      questions: [
        {
          question: "What are Comparable Companies?",
          answer: "Similar Companies Used for Valuation",
        },
        {
          question: "What is a Control Premium?",
          answer: "Premium Paid for Controlling Stake",
        },
        {
          question: "What is Market Multiple?",
          answer: "Ratio Used to Value Similar Companies",
        },
        {
          question: "What is Perpetuity Growth?",
          answer: "Long-term Stable Growth Rate",
        },
        {
          question: "What is Trading Multiple?",
          answer: "Valuation Metric Based on Market Prices",
        },
        {
          question: "What is Intrinsic Value?",
          answer: "Fundamental Value Based on Cash Flows",
        },
        {
          question: "What is Precedent Transaction?",
          answer: "Similar Past Deal Used for Valuation",
        },
        {
          question: "What is Minority Interest?",
          answer: "Non-controlling Ownership Stake",
        },
      ],
    },
  },
};

export default function MatchContent() {
  const pathname = usePathname();

  const getQuestions = () => {
    if (pathname.includes("/banks/")) {
      const bankId = pathname.split("/banks/")[1]?.split("/")[0];
      return sampleQuestions.banks[bankId]?.questions || [];
    } else if (pathname.includes("/m&i400/")) {
      const categoryId = pathname.split("/m&i400/")[1]?.split("/")[0];
      return sampleQuestions["m-and-i"][categoryId]?.questions || [];
    }
    // Default practice questions
    return [
      {
        question: "What affects Operating Cash Flow?",
        answer: "Changes in Working Capital and Net Income",
      },
      {
        question: "What is a Synergy?",
        answer: "Additional Value Created in Merger",
      },
      {
        question: "What is Due Diligence?",
        answer: "Detailed Investigation Before Transaction",
      },
      {
        question: "What is Market Risk?",
        answer: "Risk Affecting Entire Market",
      },
      {
        question: "What is Capital Structure?",
        answer: "Mix of Debt and Equity Financing",
      },
      {
        question: "What is Depreciation?",
        answer: "Allocation of Asset Cost Over Time",
      },
      {
        question: "What is Operating Income?",
        answer: "Revenue Minus Operating Expenses",
      },
      {
        question: "What is Liquidity?",
        answer: "Ability to Convert Assets to Cash",
      },
    ];
  };

  return <MatchGame questions={getQuestions()} />;
}
