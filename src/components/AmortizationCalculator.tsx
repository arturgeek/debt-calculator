import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { AmortizationTable } from './AmortizationTable';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface RemainingCalculation {
  remainingBalance: number;
  remainingPayments: number;
  totalRemaining: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const AmortizationCalculator = () => {
  // Standard calculator state
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [loanResult, setLoanResult] = useState<LoanCalculation | null>(null);

  // Remaining balance calculator state
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [remainingRate, setRemainingRate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [originalTerm, setOriginalTerm] = useState('');
  const [remainingResult, setRemainingResult] = useState<RemainingCalculation | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(termMonths);

    if (!principal || !rate || !months) return;

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    const schedule = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setLoanResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    });
  };

  const calculateRemaining = () => {
    const payment = parseFloat(monthlyPayment);
    const rate = parseFloat(remainingRate) / 100 / 12;
    const current = parseInt(currentMonth);
    const totalTerms = parseInt(originalTerm);

    if (!payment || !rate || !current || !totalTerms) return;

    // Calculate original loan amount
    const originalLoan = (payment * (Math.pow(1 + rate, totalTerms) - 1)) / (rate * Math.pow(1 + rate, totalTerms));
    
    // Calculate remaining balance after current month
    let balance = originalLoan;
    for (let i = 1; i <= current; i++) {
      const interestPayment = balance * rate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
    }

    const remainingPayments = totalTerms - current;
    const totalRemaining = payment * remainingPayments;

    const schedule = [];
    let currentBalance = balance;

    for (let month = current + 1; month <= totalTerms; month++) {
      const interestPayment = currentBalance * rate;
      const principalPayment = payment - interestPayment;
      currentBalance -= principalPayment;

      schedule.push({
        month,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, currentBalance),
      });
    }

    setRemainingResult({
      remainingBalance: balance,
      remainingPayments,
      totalRemaining,
      schedule,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Credit Card Debt Calculator</h1>
        <p className="text-muted-foreground text-lg">Calculate your amortization schedule and remaining balance</p>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Standard Amortization
          </TabsTrigger>
          <TabsTrigger value="remaining" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Remaining Balance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-6">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Loan Amortization Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Loan Amount ($)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="25000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate" className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="18.99"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termMonths" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Term (Months)
                  </Label>
                  <Input
                    id="termMonths"
                    type="number"
                    placeholder="36"
                    value={termMonths}
                    onChange={(e) => setTermMonths(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateLoan} className="w-full">
                Calculate Amortization
              </Button>
              
              {loanResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-accent rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-2xl font-bold text-primary">${loanResult.monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Payment</p>
                    <p className="text-2xl font-bold text-foreground">${loanResult.totalPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-2xl font-bold text-warning">${loanResult.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {loanResult && <AmortizationTable schedule={loanResult.schedule} title="Amortization Schedule" />}
        </TabsContent>

        <TabsContent value="remaining" className="space-y-6">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Remaining Balance Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Monthly Payment ($)
                  </Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    placeholder="850"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remainingRate" className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="remainingRate"
                    type="number"
                    step="0.01"
                    placeholder="18.99"
                    value={remainingRate}
                    onChange={(e) => setRemainingRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentMonth" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Current Month of Payment
                  </Label>
                  <Input
                    id="currentMonth"
                    type="number"
                    placeholder="12"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalTerm" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Original Term (Months)
                  </Label>
                  <Input
                    id="originalTerm"
                    type="number"
                    placeholder="36"
                    value={originalTerm}
                    onChange={(e) => setOriginalTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateRemaining} className="w-full">
                Calculate Remaining Balance
              </Button>
              
              {remainingResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-accent rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Remaining Balance</p>
                    <p className="text-2xl font-bold text-primary">${remainingResult.remainingBalance.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Payments Left</p>
                    <p className="text-2xl font-bold text-foreground">{remainingResult.remainingPayments}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Remaining</p>
                    <p className="text-2xl font-bold text-warning">${remainingResult.totalRemaining.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {remainingResult && <AmortizationTable schedule={remainingResult.schedule} title="Remaining Payment Schedule" />}
        </TabsContent>
      </Tabs>
    </div>
  );
};