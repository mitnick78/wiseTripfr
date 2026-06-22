"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  contents: Record<string, React.ReactNode>;
}

export default function Tabs({ tabs, contents }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="flex gap-1 bg-stone-100 p-1 rounded-xl w-fit mb-6 border border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{contents[activeTab]}</div>
    </div>
  );
}
