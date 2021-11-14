import fetch from "node-fetch";

export async function getData() {
  const symbol = "SBIN";
  const data = JSON.stringify({
    query: `
        query Query($stock: String!) {
          getStockData(stock: $stock) {
            open,
            date
          }
          getList
          getUser {
            name,
            balance
          }
        },
      `,
    variables: {
      stock: symbol,
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
  console.log(json.data);
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
