import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AmountSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  amount: number;
  maxAmount: number;
  unit: string;
  onAmountChange: (amount: number) => void;
}

export default function AmountSelectionDialog({
  open,
  onClose,
  onConfirm,
  itemName,
  amount,
  maxAmount,
  unit,
  onAmountChange,
}: AmountSelectionDialogProps) {
  const step = unit === 'шт' || maxAmount % 5 !== 0 ? 1 : 5;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Виберіть кількість для {itemName}</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <div className="text-center text-lg mb-4">
            {amount} / {maxAmount} {unit}
          </div>
          <div className="px-2">
            <Slider
              min={0}
              max={maxAmount}
              step={step}
              value={[amount]}
              onValueChange={([value]) => onAmountChange(value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Скасувати
          </Button>
          <Button onClick={onConfirm}>Підтвердити</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
