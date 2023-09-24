import { useState } from "react";
import { AppLayout, Container, Grid, Header } from "@awsui/components-react";
import { initialize } from "@iot-app-kit/source-iotsitewise";
import { fromEnvReactApp } from "./fromEnv";
import {
  LineChart,
  StatusTimeline,
  WebglContext,
} from "@iot-app-kit/react-components";
import { COMPARISON_OPERATOR } from "@synchro-charts/core";
const { defineCustomElements } = require("@iot-app-kit/components/loader");
const { query } = initialize({
  awsCredentials: fromEnvReactApp(),
  awsRegion: "eu-west-1",
});

defineCustomElements();

const MachineState = (props) => {
  return (
    <Container
      disableContentPaddings={true}
      header={
        <Header
          variant="h2"
          description="Operational state of the bulb as timeline"
        >
          {" "}
          Bulb State{" "}
        </Header>
      }
    >
      <div style={{ height: "200px" }}>
        <StatusTimeline
          viewport={{ duration: "1h" }}
          annotations={{
            y: [
              {
                color: "#1D8102",
                comparisonOperator: COMPARISON_OPERATOR.EQUAL,
                value: "ON",
              },
              {
                color: "#AB1D00",
                comparisonOperator: COMPARISON_OPERATOR.EQUAL,
                value: "OFF",
              },
              {
                color: "#455A64",
                comparisonOperator: COMPARISON_OPERATOR.EQUAL,
                value: "DEAD",
              },
            ],
          }}
          queries={[
            query.timeSeriesData({
              assets: [
                {
                  assetId: props.assetId,
                  properties: [
                    {
                      propertyId: props.bulbStatePropertyId,
                    },
                  ],
                },
              ],
            }),
          ]}
        />
      </div>
    </Container>
  );
};

const ProductionCount = (props) => {
  return (
    <Container
      disableContentPaddings={true}
      header={
        <Header
          variant="h2"
          description="Bulb's timeleft in percentage shown in a diagram"
        >
          {" "}
          Timeleft (%){" "}
        </Header>
      }
    >
      <div style={{ height: "300px" }}>
        <LineChart
          viewport={{ duration: "30d", yMin: 0, yMax: 100 }}
          queries={[
            query.timeSeriesData({
              assets: [
                {
                  assetId: props.assetId,
                  properties: [
                    {
                      propertyId: props.badPartsCountPropertyId,
                      refId: "bad-parts-count",
                    },
                    {
                      propertyId: props.totalPartsCountPropertyId,
                      refId: "total-parts-count",
                    },
                  ],
                },
              ],
            }),
          ]}
          styleSettings={{
            "bad-parts-count": { color: "#D13212", name: "Bad Count" },
            "total-parts-count": { color: "#1D8102", name: "Total Count" },
          }}
        />
      </div>
    </Container>
  );
};

const Content = () => {
  const DEFAULT_MACHINE_ASSET_ID = "07e7fe69-2ed9-4709-9fc5-c6201ed25fab";
  const [assetId, setAssetId] = useState(DEFAULT_MACHINE_ASSET_ID);
  const OEE_BAD_COUNT_PROPERTY = "752976a6-e65a-4de5-9ef5-ccf7fc8b0496";
  const OEE_TOTAL_COUNT_PROPERTY = "790cec98-4faf-44e8-a288-82f1b54baa7d";
  const BULB_STATE_ENUM_PROPERTY = "187473c5-f4e7-433f-8538-eafe843d0991";
  
  return (
    <Grid gridDefinition={[{ colspan: { l: 12, m: 12, default: 12 } }]}>
      <Grid
        gridDefinition={[
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 12, m: 12, default: 12 } },
        ]}
      >
        <MachineState
          assetId={DEFAULT_MACHINE_ASSET_ID}
          bulbStatePropertyId={BULB_STATE_ENUM_PROPERTY}
        />
        <ProductionCount
          assetId={assetId}
          badPartsCountPropertyId={OEE_BAD_COUNT_PROPERTY}
          totalPartsCountPropertyId={OEE_TOTAL_COUNT_PROPERTY}
        />
      </Grid>
    </Grid>
  );
};

const Aws = () => {
  return (
    <>
      <AppLayout content={<Content />} navigationHide={true} toolsHide={true} />
      <WebglContext />
    </>
  );
};

export default Aws;
