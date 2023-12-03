import { NextRequest, NextResponse } from "next/server";
const axios = require('axios');

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const exchange = searchParams.get('exchange');

  const symbolQuery = symbol ? `&symbol=${symbol}` : '';
  const exchangeQuery = exchange ? `&exchange=${exchange}` : ''

  const res = await axios.get('https://api.twelvedata.com/stocks?source=docs' + symbolQuery + exchangeQuery, {
    headers: {
      'API-Key': process.env.API_KEY,
      'Content-Type': 'application/json',
    }
  });

  return NextResponse.json(res.data);
};