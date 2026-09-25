import { scoringWeights } from '@/data/scoring';

export interface ScoreData {
  guidedCorrect: number;
  guidedTotal: number;
  freeCorrect: number;
  freeTotal: number;
  testCorrect: number;
  testTotal: number;
}

export const calculateScore = (data: ScoreData): number => {
  const guidedScore = data.guidedTotal > 0 ? (data.guidedCorrect / data.guidedTotal) : 0;
  const freeScore = data.freeTotal > 0 ? (data.freeCorrect / data.freeTotal) : 0;
  const testScore = data.testTotal > 0 ? (data.testCorrect / data.testTotal) : 0;
  
  const guidedWeight = data.guidedTotal > 0 ? scoringWeights.guided : 0;
  const freeWeight = data.freeTotal > 0 ? scoringWeights.free : 0;
  const testWeight = data.testTotal > 0 ? scoringWeights.test : 0;
  
  const totalWeight = guidedWeight + freeWeight + testWeight;
  if (totalWeight === 0) return 0;

  const totalScore = (guidedScore * guidedWeight + freeScore * freeWeight + testScore * testWeight) / totalWeight;
  return Math.round(totalScore * 100);
};
