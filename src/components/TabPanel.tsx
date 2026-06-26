import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  tabs: {
    name: string;
    content: React.ReactNode;
  }[];
}

export default function TabPanel({ tabs }: Props) {
  return (
    <Tabs defaultValue={tabs[0].name} className="w-full">
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.name}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
