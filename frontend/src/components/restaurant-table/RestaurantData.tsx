import React from "react";
import { Container } from "./RestaurantTable";
import { RestaurantInfo } from "./shared";

export interface Props {
  url: string;
}

export function RestaurantData(props: Props) {
  const { url } = props;
  const [data, setData] = React.useState<RestaurantInfo[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    async function fetchRestaurantData() {
      const raw = await fetch(url);
      const json: { data: RestaurantInfo[] } = JSON.parse(await raw.text());
      setData(json.data.sort());
    }
    fetchRestaurantData();
  }, [url]);

  if (data == null) {
    return <p>Loading...</p>;
  } else if (data && data.length) {
    return <Container data={data} />;
  } else {
    return <p>There is no data.</p>;
  }
}
