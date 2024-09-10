import { Ivs } from "@/types";
import { getStatIv, Stat, stats, statToDisplayString } from "@/utils/stat";
import * as React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { MAX_IV } from "@/utils/constants";

type CustomTickProps = React.SVGProps<SVGTextElement> & {
  payload: {
    readonly coordinate: number;
    readonly index: number;
    readonly offset: number;
    readonly value: string;
  };
};

type PokemonChartLabelProps = CustomTickProps & {
  readonly statIncreased: Stat;
  readonly statDecreased: Stat;
};

type IvChartProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly ivs: Ivs;
  readonly statIncreased: Stat;
  readonly statDecreased: Stat;
};

const getStatNameFill = (
  stat: Stat,
  statIncreased: Stat,
  statDecreased: Stat,
) =>
  stat === statIncreased
    ? "hsl(var(--stat-increase))"
    : stat === statDecreased
      ? "hsl(var(--stat-decrease))"
      : "hsl(var(--stat-neutral))";

const getStatValueFill = (value: string) =>
  value === MAX_IV.toString() ? "hsl(var(--stat-max))" : "hsl(var(--stat-neutral))";

const chartConfig = {
  value: {
    label: "IV",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonChartLabel: React.FC<PokemonChartLabelProps> = ({
  payload: { value: labelData },
  x,
  y,
  textAnchor,
  statIncreased,
  statDecreased,
}) => {
  const [stat, value] = labelData.split(",");
  // Recharts only let us send string or number values to label

  return (
    <text className="text-2xs xs:text-xs sm:max-lg:text-2xs" x={x} y={y} textAnchor={textAnchor}>
      <tspan fill={getStatNameFill(stat as Stat, statIncreased, statDecreased)}>
        {statToDisplayString(stat as Stat)}
      </tspan>
      <tspan dx={3} fill={getStatValueFill(value)}>
        ({value})
      </tspan>
    </text>
  );
};

const IvChart: React.FC<IvChartProps> = ({
  ivs,
  statIncreased,
  statDecreased,
  className,
}) => {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <RadarChart
        data={stats.map((stat: Stat) => ({
          labelData: `${stat},${getStatIv(stat, ivs)}`,
          value: getStatIv(stat, ivs),
        }))}
        outerRadius="60%"
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis
          dataKey="labelData"
          tick={(props: CustomTickProps) => (
            <PokemonChartLabel
              {...props}
              statIncreased={statIncreased}
              statDecreased={statDecreased}
            />
          )}
        />
        <PolarRadiusAxis className="hidden" domain={[0, MAX_IV]} />
        <PolarGrid />
        <Radar dataKey="value" fill="hsl(var(--primary))" fillOpacity={0.7} />
      </RadarChart>
    </ChartContainer>
  );
};

export default IvChart;
