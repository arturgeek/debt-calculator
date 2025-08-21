import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  RotateCcw, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Scale,
  HelpCircle
} from 'lucide-react';

interface AmortizationSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface AmortizationTableProps {
  schedule: AmortizationSchedule[];
  title: string;
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule, title }) => {
  const isMobile = useIsMobile();

  // Mobile Card Component with Icons and Tooltips
  const MobileCardView = () => (
    <div className="space-y-3">
      {schedule.map((row, index) => (
        <Card key={row.month} className="shadow-sm">
          <CardContent className="p-4">
            {/* Header with Month and Payment */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Payment Month</p>
                  </TooltipContent>
                </Tooltip>
                <span className="font-semibold text-lg">Month {row.month}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DollarSign className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total Monthly Payment</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-xs text-muted-foreground">Payment</span>
                </div>
                <p className="font-mono font-semibold text-primary">
                  ${row.payment.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
                </p>
              </div>
            </div>
            
            {/* Principal and Interest Row */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrendingUp className="w-3 h-3 text-success" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Principal Payment (Reduces Loan Balance)</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-xs text-muted-foreground">Principal</span>
                </div>
                <p className="font-mono text-success font-medium">
                  ${row.principal.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrendingDown className="w-3 h-3 text-warning" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Interest Payment (Cost of Borrowing)</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-xs text-muted-foreground">Interest</span>
                </div>
                <p className="font-mono text-warning font-medium">
                  ${row.interest.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
                </p>
              </div>
            </div>
            
            {/* Balance Row */}
            <div className="pt-3 border-t">
              <div className="flex items-center gap-1 mb-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Scale className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remaining Loan Balance</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs text-muted-foreground">Remaining Balance</span>
              </div>
              <p className="font-mono font-bold text-lg">
                ${row.balance.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Desktop Table Component (unchanged)
  const DesktopTableView = () => (
    <ScrollArea className="h-96 w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Month</TableHead>
            <TableHead className="font-semibold text-right">Payment</TableHead>
            <TableHead className="font-semibold text-right">Principal</TableHead>
            <TableHead className="font-semibold text-right">Interest</TableHead>
            <TableHead className="font-semibold text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((row, index) => (
            <TableRow 
              key={row.month} 
              className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
            >
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell className="text-right font-mono">
                ${row.payment.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
              </TableCell>
              <TableCell className="text-right font-mono text-success">
                ${row.principal.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
              </TableCell>
              <TableCell className="text-right font-mono text-warning">
                ${row.interest.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
              </TableCell>
              <TableCell className="text-right font-mono font-semibold">
                ${row.balance.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
          <span>{title}</span>
          {isMobile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              <span>Rotate for table view</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? <MobileCardView /> : <DesktopTableView />}
        
        {schedule.length > 0 && (
          <div className="mt-4 p-3 bg-accent/50 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground text-center">
                {isMobile ? (
                  <>
                    Showing {schedule.length} payment{schedule.length !== 1 ? 's' : ''} • 
                    Rotate device for table view
                  </>
                ) : (
                  <>
                    Showing {schedule.length} payment{schedule.length !== 1 ? 's' : ''} • 
                    Scroll to view all entries
                  </>
                )}
              </p>
              {isMobile && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      <strong>💡 Tip:</strong> Rotate your device to landscape mode to see the full table with all columns side by side for easier comparison.
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};