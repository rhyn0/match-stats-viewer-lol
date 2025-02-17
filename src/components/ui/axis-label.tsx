import type React from "react";

export type AxisLabelProps = React.PropsWithChildren<{
    axisType: "xAxis" | "yAxis";
    x: number;
    y: number;
    width: number;
    height: number;
    stroke: string;
}>;

export default function AxisLabel({
    axisType,
    x,
    y,
    width,
    height,
    stroke,
    children,
}: AxisLabelProps) {
    const isVert = axisType === "yAxis";
    const cx = isVert ? x : x + width / 2;
    const cy = isVert ? height / 2 + y : y + height + 20;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;

    //   const lineHeight = 20;
    //   if (children?.length > 1 && children.map) {
    //     return (<g>
    //       {children.map((child, index) =>
    //         renderText(
    //           child,
    //           cx,
    //           cy + index * lineHeight,
    //           rot,
    //           stroke,
    //           index)
    //       )}
    //     </g>);
    //   }

    return (
        <text
            x={x}
            y={y}
            transform={`rotate(${rot})`}
            textAnchor="middle"
            stroke={stroke}
        >
            {children}
        </text>
    );
}
