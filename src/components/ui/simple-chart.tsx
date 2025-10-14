import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleChartProps {
    data: Array<{
        label: string;
        value: number;
        color?: string;
    }>;
    type?: 'bar' | 'line' | 'pie';
    className?: string;
    maxValue?: number;
}

const SimpleChart: React.FC<SimpleChartProps> = ({
    data,
    type = 'bar',
    className,
    maxValue
}) => {
    const max = maxValue || Math.max(...data.map(d => d.value));

    if (type === 'bar') {
        return (
            <div className={cn("space-y-3", className)}>
                {data.map((item, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-muted-foreground">{item.value}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className={cn(
                                    "h-2 rounded-full transition-all duration-500",
                                    item.color || "bg-primary"
                                )}
                                style={{ width: `${(item.value / max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'line') {
        const points = data.map((item, index) => ({
            x: (index / (data.length - 1)) * 100,
            y: 100 - (item.value / max) * 100
        }));

        const pathData = points
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
            .join(' ');

        return (
            <div className={cn("relative h-32", className)}>
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={`${pathData} L 100 100 L 0 100 Z`}
                        fill="url(#gradient)"
                        className="opacity-50"
                    />
                    <path
                        d={pathData}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        className="drop-shadow-sm"
                    />
                    {points.map((point, index) => (
                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="1"
                            fill="hsl(var(--primary))"
                            className="drop-shadow-sm"
                        />
                    ))}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                    {data.map((item, index) => (
                        <span key={index} className="truncate">
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'pie') {
        let cumulativePercentage = 0;
        const radius = 40;
        const centerX = 50;
        const centerY = 50;

        return (
            <div className={cn("relative w-32 h-32 mx-auto", className)}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {data.map((item, index) => {
                        const percentage = (item.value / max) * 100;
                        const startAngle = (cumulativePercentage / 100) * 360;
                        const endAngle = ((cumulativePercentage + percentage) / 100) * 360;

                        const startAngleRad = (startAngle - 90) * (Math.PI / 180);
                        const endAngleRad = (endAngle - 90) * (Math.PI / 180);

                        const x1 = centerX + radius * Math.cos(startAngleRad);
                        const y1 = centerY + radius * Math.sin(startAngleRad);
                        const x2 = centerX + radius * Math.cos(endAngleRad);
                        const y2 = centerY + radius * Math.sin(endAngleRad);

                        const largeArcFlag = percentage > 50 ? 1 : 0;

                        const pathData = [
                            `M ${centerX} ${centerY}`,
                            `L ${x1} ${y1}`,
                            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            'Z'
                        ].join(' ');

                        cumulativePercentage += percentage;

                        return (
                            <path
                                key={index}
                                d={pathData}
                                fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
                                className="hover:opacity-80 transition-opacity"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-lg font-bold">{max}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export { SimpleChart };
