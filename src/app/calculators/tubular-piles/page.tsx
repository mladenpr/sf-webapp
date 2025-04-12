'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePileCalculations } from '@/hooks/usePileCalculations';
import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';

// Add utility function for kg to ton conversion
const kgToTons = (kg: number) => kg / 1000;

interface PileGroupFormData {
  groupName: string;
  pileCount: string;
  outerDiameter: string;
  wallThickness: string;
  pileLength: string;
  paintLength: string;
}

interface PileGroup {
  id: string;
  groupName: string;
  pileCount: number;
  outerDiameter: number;
  wallThickness: number;
  pileLength: number;
  paintLength: number;
}

export default function TubularPilesCalculator() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm<PileGroupFormData>({
    defaultValues: {
      groupName: '',
      pileCount: '',
      outerDiameter: '',
      wallThickness: '',
      pileLength: '',
      paintLength: ''
    }
  });
  
  const { pileGroups, addPileGroup, removePileGroup, updatePileGroup, calculatePileMetrics, calculateTotals } = usePileCalculations();

  const [liveCalculations, setLiveCalculations] = useState({
    innerDiameter: 0,
    crossSectionArea: 0,
    singlePileWeight: 0,
    paintAreaPerPile: 0,
  });

  // Memoize the form values we need for calculations
  const numericFormValues = React.useMemo(() => ({
    pileCount: Number(watch('pileCount')),
    outerDiameter: Number(watch('outerDiameter')),
    wallThickness: Number(watch('wallThickness')),
    pileLength: Number(watch('pileLength')),
    paintLength: Number(watch('paintLength')),
  }), [watch('pileCount'), watch('outerDiameter'), watch('wallThickness'), watch('pileLength'), watch('paintLength')]);

  // Update live calculations whenever numeric form values change
  React.useEffect(() => {
    if (Object.values(numericFormValues).every(val => !isNaN(val))) {
      const calculations = calculatePileMetrics(
        numericFormValues.outerDiameter,
        numericFormValues.wallThickness,
        numericFormValues.pileLength,
        numericFormValues.paintLength,
        numericFormValues.pileCount
      );
      setLiveCalculations(calculations);
    }
  }, [numericFormValues]);

  // Memoize the calculations for each pile group
  const groupCalculations = React.useMemo(() => 
    pileGroups.map(group => ({
      ...group,
      calculations: calculatePileMetrics(
        group.outerDiameter,
        group.wallThickness,
        group.pileLength,
        group.paintLength,
        group.pileCount
      )
    }))
  , [pileGroups]);

  const onSubmit = (data: PileGroupFormData) => {
    const newPileGroup: Omit<PileGroup, 'id'> = {
      groupName: data.groupName,
      pileCount: Number(data.pileCount),
      outerDiameter: Number(data.outerDiameter),
      wallThickness: Number(data.wallThickness),
      pileLength: Number(data.pileLength),
      paintLength: Number(data.paintLength)
    };

    if (editingId) {
      updatePileGroup(editingId, newPileGroup);
      setEditingId(null);
    } else {
      addPileGroup(newPileGroup);
    }
    reset();
  };

  const handleEdit = (group: PileGroup) => {
    setEditingId(group.id);
    setValue('groupName', group.groupName);
    setValue('pileCount', group.pileCount.toString());
    setValue('outerDiameter', group.outerDiameter.toString());
    setValue('wallThickness', group.wallThickness.toString());
    setValue('pileLength', group.pileLength.toString());
    setValue('paintLength', group.paintLength.toString());
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tubular Piles Calculator</h1>
        <p className="text-muted-foreground">Calculate weight and painting area of tubular piles</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pile Group Details</CardTitle>
            <CardDescription>Enter the specifications for your pile group</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    {...register('groupName')}
                    placeholder="Enter group name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pileCount">Number of Piles</Label>
                  <Input
                    id="pileCount"
                    type="number"
                    {...register('pileCount')}
                    placeholder="Enter number of piles"
                    min="1"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="outerDiameter">Outer Diameter (mm)</Label>
                  <Input
                    id="outerDiameter"
                    type="number"
                    {...register('outerDiameter')}
                    placeholder="Enter outer diameter"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wallThickness">Wall Thickness (mm)</Label>
                  <Input
                    id="wallThickness"
                    type="number"
                    {...register('wallThickness')}
                    placeholder="Enter wall thickness"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pileLength">Pile Length (m)</Label>
                  <Input
                    id="pileLength"
                    type="number"
                    {...register('pileLength')}
                    placeholder="Enter pile length"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paintLength">Paint Length (m)</Label>
                  <Input
                    id="paintLength"
                    type="number"
                    {...register('paintLength')}
                    placeholder="Enter paint length (0 if no painting required)"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>
              <div className="col-span-2 flex justify-end gap-4">
                {editingId && (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit">
                  {editingId ? 'Update Pile Group' : 'Add Pile Group'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Calculations Display */}
        <Card>
          <CardHeader>
            <CardTitle>Live Calculations</CardTitle>
            <CardDescription>Real-time calculation results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inner Diameter:</span>
                <span className="font-mono">{liveCalculations.innerDiameter.toFixed(2)} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cross Section Area:</span>
                <span className="font-mono">{liveCalculations.crossSectionArea.toFixed(2)} mm²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Single Pile Weight:</span>
                <span className="font-mono">{kgToTons(liveCalculations.singlePileWeight).toFixed(3)} tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paint Area per Pile:</span>
                <span className="font-mono">{liveCalculations.paintAreaPerPile.toFixed(2)} m²</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pile Groups Summary</CardTitle>
            <CardDescription>Overview of all pile groups and totals</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Pile Count</TableHead>
                    <TableHead>Diameter (mm)</TableHead>
                    <TableHead>Thickness (mm)</TableHead>
                    <TableHead>Length (m)</TableHead>
                    <TableHead>Paint Length (m)</TableHead>
                    <TableHead>Total Weight (kg)</TableHead>
                    <TableHead>Total Paint Area (m²)</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pileGroups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No pile groups added
                      </TableCell>
                    </TableRow>
                  ) : (
                    groupCalculations.map(({ id, groupName, pileCount, outerDiameter, wallThickness, pileLength, paintLength, calculations }) => (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{groupName}</TableCell>
                        <TableCell>{pileCount}</TableCell>
                        <TableCell>{outerDiameter}</TableCell>
                        <TableCell>{wallThickness}</TableCell>
                        <TableCell>{pileLength}</TableCell>
                        <TableCell>{paintLength}</TableCell>
                        <TableCell>{kgToTons(calculations.totalWeight).toFixed(3)}</TableCell>
                        <TableCell>{calculations.totalPaintArea.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit({ id, groupName, pileCount, outerDiameter, wallThickness, pileLength, paintLength })}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="Edit pile group"
                            >
                              <Pencil1Icon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removePileGroup(id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Remove pile group"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Totals Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Totals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Weight</div>
                <div className="text-2xl font-bold">{kgToTons(totals.totalWeight).toFixed(3)} tons</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Paint Area</div>
                <div className="text-2xl font-bold">{totals.totalPaintArea.toFixed(2)} m²</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 