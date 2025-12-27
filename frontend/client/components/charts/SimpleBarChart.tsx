interface BarChartData {
  name: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarChartData[];
  height?: number;
}

export function SimpleBarChart({ data, height = 300 }: SimpleBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No data
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const chartHeight = height - 40;

  return (
    <div>
      <div
        style={{
          height: chartHeight,
          display: "flex",
          alignItems: "flex-end",
          gap: "16px",
          justifyContent: "space-around",
          paddingBottom: "16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {data.map((item, idx) => {
          const barHeight =
            maxValue <= 0 ? 0 : (item.value / maxValue) * (chartHeight - 20);
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: barHeight,
                  backgroundColor: "#7c3aed",
                  borderRadius: "8px 8px 0 0",
                  minHeight: "8px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                title={`${item.name}: ${item.value}`}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "8px",
        }}
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
