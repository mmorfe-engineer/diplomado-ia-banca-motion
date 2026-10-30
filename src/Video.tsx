import React from "react";
import { AbsoluteFill, Audio, Sequence, getInputProps, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SCENES, SCENE_START, TOTAL_FRAMES } from "./timeline";
import { FPS } from "./lib";
import { Captions } from "./fx/Captions";
import { C } from "./theme";
import { S1 } from "./scenes/S1";
import { S2 } from "./scenes/S2";

import { S3 } from "./scenes/S3";
import { S4 } from "./scenes/S4";
import { S5 } from "./scenes/S5";
import { S6 } from "./scenes/S6";
import { S7, S8, S9, S10 } from "./scenes/diplomado/Block07_10";
import { S11, S12, S13, S14, S15, S16 } from "./scenes/diplomado/Block11_16";
import { S17_18, S19, S20, S21 } from "./scenes/diplomado/Block17_21";

const COMP: Record<string, React.FC> = { s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8, s9: S9, s10: S10, s11: S11, s12: S12, s13: S13, s14: S14, s15: S15, s16: S16, s17_18: S17_18, s19: S19, s20: S20, s21: S21 };
const XF = 0.5; // crossfade overlap between scenes (s)

export const Video: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {SCENES.map((s, i) => {
      const from = Math.round(SCENE_START[s.id] * FPS);
      const dur = Math.round((s.dur + (i < SCENES.length - 1 ? XF : 0)) * FPS);
      const Comp = COMP[s.id];
      return (
        <Sequence key={s.id} from={from} durationInFrames={dur} name={s.id}>
          <SceneFade dur={dur} first={i === 0}>
            <Comp />
          </SceneFade>
          {s.voice !== 'silence' && <Sequence from={Math.round(s.pre * FPS)} layout="none">
            <Audio src={staticFile(`voice/diplomado/${s.voice}.wav`)} />
          </Sequence>}
          {s.extra && (
            <Sequence from={Math.round(s.extraAt * FPS)} layout="none">
              <Audio src={staticFile(`voice/diplomado/${s.extra.voice}.wav`)} />
            </Sequence>
          )}
        </Sequence>
      );
    })}
    <Audio
      src={staticFile("sfx/pad.wav")}
      volume={(f) => interpolate(f, [0, TOTAL_FRAMES - 120, TOTAL_FRAMES], [0.55, 0.55, 0], { extrapolateRight: "clamp" })}
    />
    {/* thumb: true hides the captions when exporting thumbnails */}
    {!getInputProps().thumb && <Captions />}
  </AbsoluteFill>
);

const SceneFade: React.FC<{ dur: number; first: boolean; children: React.ReactNode }> = ({ dur, first, children }) => {
  const f = useCurrentFrame();
  const xf = XF * FPS;
  const o = Math.min(first ? 1 : interpolate(f, [0, xf], [0, 1], { extrapolateRight: "clamp" }), interpolate(f, [dur - xf, dur], [1, 0], { extrapolateLeft: "clamp" }));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};
