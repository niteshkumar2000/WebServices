import fetch from "node-fetch";

async function getData() {
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

  const data1 = JSON.stringify({
    query: `
      mutation Mutation($input: Float!, $buyOrder: PortfolioInput!) {
        addBalance(input: $input)
        buyStock(input: $buyOrder)
      }
    `,
    variables: {
      input: 100,
      buyOrder: { stockName: "SBIN", sharesCount: 1 },
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

getData();
