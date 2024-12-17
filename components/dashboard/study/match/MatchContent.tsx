"use client";

import { usePathname } from "next/navigation";
import MatchGame from "./MatchGame";
import styles from "./match.module.css";

interface Question {
  question: string;
  answer: string;
}

interface BankMap {
  [key: string]: {
    questions: Question[];
  };
}

interface QuestionsData {
  banks: BankMap;
  "m-and-i": BankMap;
}

// Explicitly type sampleQuestions as QuestionsData
const sampleQuestions: QuestionsData = {
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
      // Check if bankId exists and is a valid key before indexing
      if (bankId && bankId in sampleQuestions.banks) {
        return sampleQuestions.banks[bankId].questions;
      }
      return [];
    } else if (pathname.includes("/m&i400/")) {
      const categoryId = pathname.split("/m&i400/")[1]?.split("/")[0];
      if (categoryId && categoryId in sampleQuestions["m-and-i"]) {
        return sampleQuestions["m-and-i"][categoryId].questions;
      }
      return [];
    }
    // Default practice questions
    return [
      {
        question:
          "What is the primary difference between Internal Rate of Return (IRR) and Modified Internal Rate of Return (MIRR) when evaluating investment opportunities, particularly in scenarios with unconventional cash flows and multiple sign changes?",
        answer:
          "MIRR addresses the reinvestment rate assumption inherent in traditional IRR calculations by explicitly allowing for different reinvestment and finance rates, providing a more realistic evaluation of project returns. This is particularly important in scenarios where cash flows switch between positive and negative multiple times, as IRR can produce multiple or misleading results in such cases.",
      },
      {
        question:
          "What is Working Capital Management and why is it crucial for a company's operational efficiency and short-term financial health in the context of day-to-day business operations?",
        answer:
          "Working Capital Management involves optimizing the balance between current assets and current liabilities to ensure operational efficiency while maintaining adequate liquidity. This includes managing inventory levels, accounts receivable collection periods, accounts payable timing, and cash conversion cycle to minimize financing costs and maximize return on current assets while ensuring sufficient liquidity for daily operations.",
      },
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

  return (
    <>
      <MatchGame questions={getQuestions()} />
      <hr className={styles.separator} />
    </>
  );
}
