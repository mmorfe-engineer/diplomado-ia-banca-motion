import { getInputProps } from 'remotion';
import { es } from './es';
import type { Locale } from './en';
import words from './diplomado/words.json';
import voices from './diplomado/voices.json';

// Keep the approved 01–02 review selectable without changing its scene definitions.
const requested = getInputProps().block;
export const REVIEW_BLOCK = ["03-06", "07-10", "11-16", "17-21"].includes(requested as string) ? requested as string : "01-02";
export const diplomado: Locale = {
  ...es,
  heroName: 'Isabel',
  words: words as unknown as Record<string, [string, number, number][]>,
  voices,
  scenes: REVIEW_BLOCK === "17-21" ? [
    {id: 's17_18', voice: 'v17_18', pre: 0.6, tail: 0.9},
    {id: 's19', voice: 'v19', pre: 0.6, tail: 0.9},
    {id: 's20', voice: 'v20', pre: 0.6, tail: 1.2},
    {id: 's21', voice: 'silence', pre: 0, tail: 0},
  ] : REVIEW_BLOCK === "11-16" ? [
    {id: 's11', voice: 'v11', pre: 0.6, tail: 0.9},
    {id: 's12', voice: 'v12', pre: 0.6, tail: 0.9},
    {id: 's13', voice: 'v13', pre: 0.6, tail: 0.9},
    {id: 's14', voice: 'v14', pre: 0.6, tail: 0.9},
    {id: 's15', voice: 'v15', pre: 0.6, tail: 0.9},
    {id: 's16', voice: 'v16', pre: 0.6, tail: 1.2},
  ] : REVIEW_BLOCK === "07-10" ? [
    {id: 's7', voice: 'v7', pre: 0.6, tail: 0.9},
    {id: 's8', voice: 'v8', pre: 0.6, tail: 0.9},
    {id: 's9', voice: 'v9', pre: 0.6, tail: 0.9},
    {id: 's10', voice: 'v10', pre: 0.6, tail: 1.2},
  ] : REVIEW_BLOCK === "03-06" ? [
    {id: 's3', voice: 'v3', pre: 0.6, tail: 0.9},
    {id: 's4', voice: 'v4', pre: 0.6, tail: 0.9},
    {id: 's5', voice: 'v5', pre: 0.6, tail: 0.9},
    {id: 's6', voice: 'v6', pre: 0.6, tail: 1.2},
  ] : [
    {id: 's1', voice: 'v1', pre: 0.6, tail: 0.9},
    {id: 's2', voice: 'v2', pre: 0.6, tail: 1.2},
  ],
};
