import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../../data/mockGeoFeatures";

import { mockGeographyData as data } from "../../data/mockData";

const GeographyChart = ({ isDashboard = false }) => {
 
  return (
    <ResponsiveChoropleth
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#141414",
            },
          },
          legend: {
            text: {
              fill: "#141414",
            },
          },
          ticks: {
            line: {
              stroke: "#141414",
              strokeWidth: 1,
            },
            text: {
              fill: "#141414",
            },
          },
        },
        legends: {
          text: {
            fill: "#141414",
          },
        },
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#141414",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;