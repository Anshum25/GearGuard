interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface SimplePieChartProps {
  data: PieChartData[];
  size?: number;
}

export function SimplePieChart({ data, size = 200 }: SimplePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0 || total <= 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No data
      </div>
    );
  }

  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;

  let currentAngle = -Math.PI / 2;
  const slices = data.map((item) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    const midAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius * 0.65;
    const labelX = cx + labelRadius * Math.cos(midAngle);
    const labelY = cy + labelRadius * Math.sin(midAngle);

    const slice = {
      path: pathData,
      color: item.color,
      labelX,
      labelY,
      name: item.name,
      value: item.value,
    };

    currentAngle = endAngle;
    return slice;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <svg width={size} height={size} style={{ maxWidth: "100%" }}>
        {slices.map((slice, idx) => (
          <g key={idx}>
            <path
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={slice.labelX}
              y={slice.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fontWeight="bold"
              fill="white"
              pointerEvents="none"
            >
              {slice.name}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "2px",
                backgroundColor: item.color,
              }}
            />
            <span>
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
