import { useState } from 'react';

interface PileGroup {
  id: string;
  groupName: string;
  pileCount: number;
  outerDiameter: number;
  wallThickness: number;
  pileLength: number;
  paintLength: number;
}

interface PileCalculations {
  innerDiameter: number;
  crossSectionArea: number;
  singlePileWeight: number;
  paintAreaPerPile: number;
  totalWeight: number;
  totalPaintArea: number;
}

export function usePileCalculations() {
  const [pileGroups, setPileGroups] = useState<PileGroup[]>([]);

  const calculatePileMetrics = (
    outerDiameter: number,
    wallThickness: number,
    pileLength: number,
    paintLength: number,
    pileCount: number
  ): PileCalculations => {
    // All calculations in SI units (meters, kilograms)
    const outerRadius = outerDiameter / 2000; // Convert mm to m
    const innerRadius = (outerDiameter - 2 * wallThickness) / 2000; // Convert mm to m
    const innerDiameter = innerRadius * 2 * 1000; // Convert back to mm for display

    // Cross section area in mm²
    const crossSectionArea = 
      Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * 1000000;

    // Weight calculation
    const steelDensity = 7850; // kg/m³
    const volume = crossSectionArea / 1000000 * pileLength; // Convert mm² to m² and multiply by length
    const singlePileWeight = volume * steelDensity;

    // Paint area calculation
    const paintAreaPerPile = paintLength > 0 
      ? Math.PI * outerDiameter / 1000 * paintLength // Convert diameter to m
      : 0;

    const totalWeight = singlePileWeight * pileCount;
    const totalPaintArea = paintAreaPerPile * pileCount;

    return {
      innerDiameter,
      crossSectionArea,
      singlePileWeight,
      paintAreaPerPile,
      totalWeight,
      totalPaintArea,
    };
  };

  const addPileGroup = (pileGroup: Omit<PileGroup, 'id'>) => {
    const newGroup = {
      ...pileGroup,
      id: Date.now().toString(),
    };
    setPileGroups((prev) => [...prev, newGroup]);
  };

  const removePileGroup = (id: string) => {
    setPileGroups((prev) => prev.filter((group) => group.id !== id));
  };

  const updatePileGroup = (id: string, updatedGroup: Omit<PileGroup, 'id'>) => {
    setPileGroups((prev) => 
      prev.map((group) => 
        group.id === id ? { ...updatedGroup, id } : group
      )
    );
  };

  const calculateTotals = () => {
    return pileGroups.reduce(
      (acc, group) => {
        const calculations = calculatePileMetrics(
          group.outerDiameter,
          group.wallThickness,
          group.pileLength,
          group.paintLength,
          group.pileCount
        );
        return {
          totalWeight: acc.totalWeight + calculations.totalWeight,
          totalPaintArea: acc.totalPaintArea + calculations.totalPaintArea,
        };
      },
      { totalWeight: 0, totalPaintArea: 0 }
    );
  };

  return {
    pileGroups,
    addPileGroup,
    removePileGroup,
    updatePileGroup,
    calculatePileMetrics,
    calculateTotals,
  };
} 