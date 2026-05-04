import { useContext } from 'react';
import { WeddingContext } from './wedding-context';

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error('useWedding must be used within WeddingProvider');
  return ctx;
}
