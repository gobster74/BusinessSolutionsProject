import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Download, FileSpreadsheet, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function BookkeepingExport() {
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-11-01');
  const [exportFormat, setExportFormat] = useState('csv');

  const handleExport = () => {
    // Mock data for export
    const data = [
      { date: '2025-10-25', orderId: 'ORD-1100', waiter: 'Sarah', table: 'Table 1', total: 45.00, payment: 'Credit Card' },
      { date: '2025-10-26', orderId: 'ORD-1101', waiter: 'Mike', table: 'Table 3', total: 62.50, payment: 'Cash' },
      { date: '2025-10-27', orderId: 'ORD-1102', waiter: 'Jessica', table: 'Table 5', total: 38.75, payment: 'Debit Card' },
      { date: '2025-10-28', orderId: 'ORD-1103', waiter: 'Sarah', table: 'Table 2', total: 55.00, payment: 'Credit Card' },
      { date: '2025-10-29', orderId: 'ORD-1104', waiter: 'Mike', table: 'Table 7', total: 71.25, payment: 'Cash' },
      { date: '2025-10-30', orderId: 'ORD-1105', waiter: 'Jessica', table: 'Table 4', total: 49.50, payment: 'Credit Card' },
      { date: '2025-10-31', orderId: 'ORD-1106', waiter: 'Sarah', table: 'Table 6', total: 58.00, payment: 'Debit Card' },
      { date: '2025-11-01', orderId: 'ORD-1234', waiter: 'Sarah', table: 'Table 5', total: 42.50, payment: 'Credit Card' },
    ];

    if (exportFormat === 'csv') {
      // Generate CSV
      const headers = ['Date', 'Order ID', 'Waiter', 'Table', 'Total', 'Payment Method'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => [
          row.date,
          row.orderId,
          row.waiter,
          row.table,
          row.total.toFixed(2),
          row.payment
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookkeeping-${startDate}-to-${endDate}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Generate Excel-compatible format (tab-separated)
      const headers = ['Date', 'Order ID', 'Waiter', 'Table', 'Total', 'Payment Method'];
      const tsvContent = [
        headers.join('\t'),
        ...data.map(row => [
          row.date,
          row.orderId,
          row.waiter,
          row.table,
          row.total.toFixed(2),
          row.payment
        ].join('\t'))
      ].join('\n');

      const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookkeeping-${startDate}-to-${endDate}.xls`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const exportSummaryReport = () => {
    const summary = `BUNBELIEVABLE SMASH BURGERS - SUMMARY REPORT
Date Range: ${startDate} to ${endDate}
=====================================

Total Revenue: $422.50
Total Orders: 8
Average Order Value: $52.81

Payment Method Breakdown:
- Credit Card: $203.50 (48.2%)
- Cash: $133.75 (31.7%)
- Debit Card: $85.25 (20.2%)

Top Performing Waiter:
Sarah - 4 orders, $200.50 total

Busiest Day: 2025-10-29 - $71.25

=====================================
Report generated on ${new Date().toLocaleString()}
`;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-report-${startDate}-to-${endDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Export Bookkeeping Data
          </CardTitle>
          <CardDescription>
            Export order data for accounting and bookkeeping purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Comma-separated)</SelectItem>
                  <SelectItem value="excel">Excel (Tab-separated)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleExport}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Export includes: Order ID, Date/Time, Waiter, Table, Total Amount, Payment Method
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate summary reports and quick exports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={exportSummaryReport}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Summary Report
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                setStartDate(today);
                setEndDate(today);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Today's Data
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date(today);
                lastWeek.setDate(lastWeek.getDate() - 7);
                setStartDate(lastWeek.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Last 7 Days
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                const today = new Date();
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              This Month
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="mb-2">Export Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>CSV files can be opened in Excel or Google Sheets</li>
              <li>Summary reports include revenue analytics</li>
              <li>Use date filters for specific periods</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
