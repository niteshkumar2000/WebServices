import fetch from "node-fetch";

export async function getNewsData() {
  const symbol = "SBIN";
  const data = JSON.stringify({
    query: `
        query {
          getNews {
            company
            date
            price
            quantity
          }
        },
      `,
  });

  const response = await fetch("http://localhost:5000", {
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: "W01SAW9-MH64XRE-GG8M01J-HBKZ6F1",
      "User-Agent": "Node",
    },
  });
  const json = await response.json();
  return json["data"]["getNews"];
}

export async function buyStock(order) {
  const data = JSON.stringify({
    query: `
      mutation Mutation($buyOrder: PortfolioInput!) {
        buyStock(input: $buyOrder)
      }
    `,
    variables: {
      buyOrder: order,
    },
  });

  const response = await fetch("http://localhost:5000", {
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: "W01SAW9-MH64XRE-GG8M01J-HBKZ6F1",
      "User-Agent": "Node",
    },
  });
  const json = await response.json();
  return json;
}

export async function sellStock(order) {
  const data = JSON.stringify({
    query: `
      mutation Mutation($sellOrder: PortfolioInput!) {
        sellStock(input: $sellOrder)
      }
    `,
    variables: {
      sellOrder: order,
    },
  });

  const response = await fetch("http://localhost:5000", {
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: "W01SAW9-MH64XRE-GG8M01J-HBKZ6F1",
      "User-Agent": "Node",
    },
  });
  const json = await response.json();
  return json;
}

export async function IPOSubscription(IPOData) {
  const data = JSON.stringify({
    query: `
      mutation Mutation($data: Boolean!) {
        subscribeIPO(input: $data)
      }
    `,
    variables: {
      data: IPOData,
    },
  });

  const response = await fetch("http://localhost:5000", {
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: "W01SAW9-MH64XRE-GG8M01J-HBKZ6F1",
      "User-Agent": "Node",
    },
  });
  const json = await response.json();
  return json["data"]["subscribeIPO"];
}
