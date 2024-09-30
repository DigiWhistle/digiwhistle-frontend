"use client";

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function CircularChart({ metric, percent }: { metric: any; percent: boolean }) {
  const label = metric.key;
  const value = metric.value;
  let displayvalue;
  if (percent) {
    displayvalue = `${metric.value}%`;
  } else {
    displayvalue = `${metric.value}`;
  }

  const chartData = [{ browser: "chrome", visitors: value, fill: "#0A70F5" }];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "#0A70F5",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex h-48 w-48">
      <ChartContainer config={chartConfig} className=" aspect-square max-h-[250px] ">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={percent ? value * 3.6 : 200}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[#CEE4FF] last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan x={viewBox.cx} y={110} className="fill-foreground text-4xl font-bold">
                        {displayvalue}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={80}
                        className="fill-muted-foreground text-body-lg-semibold"
                      >
                        {label}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
