import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
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
        {schedule.length > 0 && (
          <div className="mt-4 p-3 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Showing {schedule.length} payment{schedule.length !== 1 ? 's' : ''} • 
              Scroll to view all entries
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};