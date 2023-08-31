import { useEffect, useState } from "react";
import { List, Action, ActionPanel } from "@raycast/api";
import { items } from "./classes.json";

export default function Command() {
  interface vClasses {
    category: string;
    classes: Array<string>;
    docs?: string;
  }

  const [query, setQuery] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(
      (items as vClasses[])
        .filter((item) => item.category.includes(query) || item.classes.includes(query))
        .slice(0, 100)
    );
  }, [query]);

  const DocsLink = ({
    title = "Documentation",
    target,
    text,
    isDoc = false,
  }: {
    title?: string;
    target?: string;
    text?: string;
    isDoc: boolean;
  }) => {
    const finalTarget = target && isDoc ? target : "https://v2.vuetifyjs.com/en/";
    const finalText = text && isDoc ? text : "General Documentation";

    return <List.Item.Detail.Metadata.Link title={title} target={finalTarget} text={finalText} />;
  };

  return (
    <List
      isShowingDetail
      searchText={query}
      onSearchTextChange={setQuery}
      filtering={false}
      throttle={true}
      navigationTitle="Search Vuetify 2 Classes"
      searchBarPlaceholder="Search for a Vuetify 2 utility class"
    >
      {filteredList.map((item) => (
        <List.Section key={item.category} title={item.category}>
          {item.classes.map((vClass) => (
            <List.Item
              key={vClass}
              title={vClass}
              detail={
                <List.Item.Detail
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.TagList title="Type">
                        <List.Item.Detail.Metadata.TagList.Item text={item.category} color={"#2f92d4"} />
                      </List.Item.Detail.Metadata.TagList>
                      <DocsLink text={item.category} target={item.docs} isDoc={!!item.docs} />
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              actions={
                <ActionPanel title="What to do with this class">
                  <Action.CopyToClipboard title="Copy" content={vClass} />
                  <Action.Paste title="Paste" content={vClass} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
