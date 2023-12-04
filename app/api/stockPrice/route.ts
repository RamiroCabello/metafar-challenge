import { NextRequest, NextResponse } from "next/server";
const axios = require('axios');

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const {symbol, interval, startDate, endDate} = body;

  const startDateQuery = startDate ? `&start_date=${startDate}` : '';
  const endDateQuery = startDate && endDate ? `&end_date=${endDate}` : '';
  const apiKey = `&apikey=${process.env.API_KEY}`

  const res = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}` + startDateQuery + endDateQuery + apiKey, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return NextResponse.json(res.data);
};