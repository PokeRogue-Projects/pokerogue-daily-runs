import * as React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Pokemon } from "@/types";
import { getStatIv, Stat, stats } from "@/utils/stat";
import { isDecreaseStat, isIncreaseStat, Nature } from "@/utils/nature";
import { toEnumValue } from "@/utils/enumUtils";

type CustomTickProps = React.SVGProps<SVGTextElement> & {
  payload: {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  }
}

type PokemonChartLabelProps = CustomTickProps & {
  nature: Nature;
}

type IvChartProps = React.HTMLAttributes<HTMLDivElement> & {
  ivs: Pokemon["ivs"];
  nature: Nature;
};

const getChartLabelFill = (stat: Stat, nature: Nature) => 
  isIncreaseStat(stat, nature) ? "hsl(var(--stat-increase))" : 
  isDecreaseStat(stat, nature) ? "hsl(var(--stat-decrease))" : 
  "hsl(var(--stat-neutral))";

const chartConfig = {
  value: {
    label: "IV",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonChartLabel: React.FC<PokemonChartLabelProps> = ({ payload, x, y, textAnchor, nature }) => {
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill={getChartLabelFill(toEnumValue(Stat, payload.value), nature)}>
      {payload.value}
    </text>
  )
}

const IvChart: React.FC<IvChartProps> = ({ ivs, nature, className }) => (
  <ChartContainer
    config={chartConfig}
    className={className}
  >
    <RadarChart data={stats.map((stat: Stat) => ({ stat: stat, value: getStatIv(stat, ivs)}))}>
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />
      <PolarAngleAxis dataKey="stat" tick={(props: CustomTickProps) => <PokemonChartLabel {...props} nature={nature} />} />
      <PolarRadiusAxis className="hidden" domain = {[0, 31]} />
      <PolarGrid />
      <Radar
        dataKey="value"
        fill="hsl(var(--primary))"
        fillOpacity={0.7}
      />
    </RadarChart>
  </ChartContainer>
)

export default IvChart;