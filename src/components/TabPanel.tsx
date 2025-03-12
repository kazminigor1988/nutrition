import { Tab } from '@headlessui/react';

interface Props {
  tabs: {
    name: string;
    content: React.ReactNode;
  }[];
}

export default function Tabs({ tabs }: Props) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-xl bg-gray-800 p-2 mb-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `w-full rounded-lg py-3 text-base font-medium leading-5 text-white
              ring-white/60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2
              ${
                selected
                  ? 'bg-blue-600 shadow'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {tabs.map((tab, idx) => (
          <Tab.Panel
            key={idx}
            className="rounded-xl bg-gray-800 p-3 ring-white/60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
} 