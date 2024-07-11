import { Ivs } from "@/types";
import { toEnumValue } from "@/utils/enumUtils";
import * as React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { getStatIv, Stat, stats, statToDisplayString } from "@/utils/stat";

type CustomTickProps = React.SVGProps<SVGTextElement> & {
  payload: {
    readonly coordinate: number;
    readonly index: number;
    readonly offset: number;
    readonly value: Stat;
  }
}

type PokemonChartLabelProps = CustomTickProps & {
  readonly statIncreased: Stat;
  readonly statDecreased: Stat;
}

type IvChartProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly ivs: Ivs;
  readonly statIncreased: Stat;
  readonly statDecreased: Stat;
};

const getChartLabelFill = (stat: Stat, statIncreased: Stat, statDecreased: Stat) => 
  stat === statIncreased ? "hsl(var(--stat-increase))" : 
  stat === statDecreased ? "hsl(var(--stat-decrease))" : 
  "hsl(var(--stat-neutral))";

const chartConfig = {
  value: {
    label: "IV",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonChartLabel: React.FC<PokemonChartLabelProps> = ({ payload: { value: stat }, x, y, textAnchor, statIncreased, statDecreased }) => {
  return (
    <text 
      x={x} 
      y={y} 
      textAnchor={textAnchor} 
      fill={getChartLabelFill(stat, statIncreased, statDecreased)}
    >
      {statToDisplayString(stat)}
    </text>
  )
}

const IvChart: React.FC<IvChartProps> = ({ ivs, statIncreased, statDecreased, className }) => (
  <ChartContainer
    config={chartConfig}
    className={className}
  >
    <RadarChart data={stats.map((stat: Stat) => ({ stat: stat, value: getStatIv(stat, ivs)}))}>
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />
      <PolarAngleAxis
        dataKey="stat" 
        tick={(props: CustomTickProps) => 
          <PokemonChartLabel {...props} statIncreased={statIncreased} statDecreased={statDecreased} />
        } 
      />
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