import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';

interface AnalyticsProps {
  totalApplications: number;
  applicationsByStatus: {
    status: string;
    count: number;
  }[];
  applicationsByCompany: {
    company: string;
    count: number;
  }[];
  responseRates: {
    status: string;
    rate: number;
  }[];
}

const chartConfig: ChartConfig = {
  applications: {
    theme: {
      light: 'hsl(var(--chart-1))',
      dark: 'hsl(var(--chart-1))',
    },
  },
  responses: {
    theme: {
      light: 'hsl(var(--chart-2))',
      dark: 'hsl(var(--chart-2))',
    },
  },
};

const AnalyticsDashboard: React.FC<AnalyticsProps> = ({
  totalApplications,
  applicationsByStatus,
  applicationsByCompany,
  responseRates,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApplications}</div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Applications by Status</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={applicationsByStatus}>
              <XAxis
                dataKey="status"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Bar
                dataKey="count"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Response Rates by Stage</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={responseRates}>
              <XAxis
                dataKey="status"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Bar
                dataKey="rate"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;