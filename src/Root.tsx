import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import { TOTAL_FRAMES } from "./timeline";
import { REVIEW_BLOCK } from "./locales/diplomado";
import { FPS } from "./lib";

export const Root: React.FC = () => (
  <Composition id={`DiplomadoIA-Revision${REVIEW_BLOCK}`} component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
);
