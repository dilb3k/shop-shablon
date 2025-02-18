import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Modal, Button, Radio, RadioGroup, FormControlLabel, Select, MenuItem, TextField } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DollarSign, ShoppingCart, PiggyBank, CreditCard, TrendingUp, Calendar, FileText, Briefcase, Banknote, BarChart2 } from "lucide-react";

export default function FinancialCalculator() {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [goal, setGoal] = useState(0);
  const [months, setMonths] = useState(null);
  const [loan, setLoan] = useState(0);
  const [loanMonths, setLoanMonths] = useState(0);
  const [loanPayment, setLoanPayment] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCalculation, setSelectedCalculation] = useState("savings");
  const [currency, setCurrency] = useState("UZS");
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentRate, setInvestmentRate] = useState(0);
  const [investmentYears, setInvestmentYears] = useState(0);
  const [investmentResult, setInvestmentResult] = useState(null);
  const [inflationRate, setInflationRate] = useState(0);
  const [annualIncome, setAnnualIncome] = useState(0);
  const [annualExpenses, setAnnualExpenses] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const formatNumber = (num) => num.toLocaleString("ru-RU");

  const calculateMonths = () => {
    const savingsPerMonth = salary - expenses;
    if (savingsPerMonth > 0) {
      const totalMonths = Math.ceil(goal / savingsPerMonth);
      setMonths(`${totalMonths} oy`);
    } else {
      setMonths("Jamg'ara olmaysiz! Harajatlarni kamaytiring.");
    }
  };

  const calculateLoan = () => {
    if (loan > 0 && loanMonths > 0) {
      const monthlyPayment = (loan / loanMonths) * 1.1; // 10% foizni qo'shamiz
      setLoanPayment(formatNumber(monthlyPayment.toFixed(2)));
    } else {
      setLoanPayment("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateInvestment = () => {
    if (investmentAmount > 0 && investmentRate > 0 && investmentYears > 0) {
      const result = investmentAmount * Math.pow(1 + investmentRate / 100, investmentYears);
      setInvestmentResult(formatNumber(result.toFixed(2)));
    } else {
      setInvestmentResult("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateInflation = () => {
    if (inflationRate > 0 && goal > 0 && months > 0) {
      const futureValue = goal / Math.pow(1 + inflationRate / 100, months / 12);
      setGoal(futureValue.toFixed(2));
    } else {
      setGoal("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateAnnualIncome = () => {
    if (salary > 0) {
      setAnnualIncome(salary * 12);
    } else {
      setAnnualIncome("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateAnnualExpenses = () => {
    if (expenses > 0) {
      setAnnualExpenses(expenses * 12);
    } else {
      setAnnualExpenses("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateNetIncome = () => {
    if (salary > 0 && expenses > 0) {
      setNetIncome((salary - expenses) * 12);
    } else {
      setNetIncome("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const handleCalculation = () => {
    switch (selectedCalculation) {
      case "savings":
        calculateMonths();
        break;
      case "loan":
        calculateLoan();
        break;
      case "investment":
        calculateInvestment();
        break;
      case "inflation":
        calculateInflation();
        break;
      case "annualIncome":
        calculateAnnualIncome();
        break;
      case "annualExpenses":
        calculateAnnualExpenses();
        break;
      case "netIncome":
        calculateNetIncome();
        break;
      default:
        break;
    }
  };

  const renderInputs = () => {
    switch (selectedCalculation) {
      case "savings":
        return (
          <>
            <TextField
              label="Oylik daromad"
              type="number"
              fullWidth
              margin="normal"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Oylik xarajatlar"
              type="number"
              fullWidth
              margin="normal"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Jamg'arma maqsadi"
              type="number"
              fullWidth
              margin="normal"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="mb-3"
            />
          </>
        );
      case "loan":
        return (
          <>
            <TextField
              label="Kredit miqdori"
              type="number"
              fullWidth
              margin="normal"
              value={loan}
              onChange={(e) => setLoan(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Kredit muddati (oy)"
              type="number"
              fullWidth
              margin="normal"
              value={loanMonths}
              onChange={(e) => setLoanMonths(Number(e.target.value))}
              className="mb-3"
            />
          </>
        );
      case "investment":
        return (
          <>
            <TextField
              label="Investitsiya miqdori"
              type="number"
              fullWidth
              margin="normal"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Foiz stavkasi (%)"
              type="number"
              fullWidth
              margin="normal"
              value={investmentRate}
              onChange={(e) => setInvestmentRate(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Yillar"
              type="number"
              fullWidth
              margin="normal"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(Number(e.target.value))}
              className="mb-3"
            />
          </>
        );
      case "inflation":
        return (
          <>
            <TextField
              label="Maqsad miqdori"
              type="number"
              fullWidth
              margin="normal"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Inflatsiya stavkasi (%)"
              type="number"
              fullWidth
              margin="normal"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="mb-3"
            />
          </>
        );
      case "annualIncome":
        return (
          <TextField
            label="Oylik daromad"
            type="number"
            fullWidth
            margin="normal"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="mb-3"
          />
        );
      case "annualExpenses":
        return (
          <TextField
            label="Oylik xarajatlar"
            type="number"
            fullWidth
            margin="normal"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="mb-3"
          />
        );
      case "netIncome":
        return (
          <>
            <TextField
              label="Oylik daromad"
              type="number"
              fullWidth
              margin="normal"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="mb-3"
            />
            <TextField
              label="Oylik xarajatlar"
              type="number"
              fullWidth
              margin="normal"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="mb-3"
            />
          </>
        );
      default:
        return null;
    }
  };

  const data = [
    { name: "Daromad", value: salary, icon: <DollarSign className="text-green-500" /> },
    { name: "Xarajatlar", value: expenses, icon: <ShoppingCart className="text-red-500" /> },
    { name: "Jamg'arma", value: salary - expenses, icon: <PiggyBank className="text-blue-500" /> },
    { name: "Kredit to'lovi", value: loanPayment || 0, icon: <CreditCard className="text-gray-500" /> },
    { name: "Investitsiya natijasi", value: investmentResult || 0, icon: <TrendingUp className="text-green-600" /> },
    { name: "Inflatsiya ta'siri", value: goal - (goal / Math.pow(1 + inflationRate / 100, months / 12)) || 0, icon: <BarChart2 className="text-yellow-500" /> },
    { name: "Yillik daromad", value: annualIncome || 0, icon: <Calendar className="text-green-400" /> },
    { name: "Yillik xarajatlar", value: annualExpenses || 0, icon: <FileText className="text-red-400" /> },
    { name: "Sof daromad", value: netIncome || 0, icon: <Briefcase className="text-blue-600" /> },
    { name: "Kredit qoldig'i", value: loan - (loanMonths * loanPayment) || 0, icon: <Banknote className="text-gray-600" /> },
  ];

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <div className="card bg-secondary text-white w-100 max-w-4xl p-4 rounded-lg shadow-lg">
        <h2 className="card-title text-center display-4 mb-4">💰 Moliyaviy Kalkulyator</h2>
        <div className="d-flex flex-column gap-3">
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="form-select bg-dark text-white"
          >
            <MenuItem value="UZS">UZS</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
          <button
            onClick={() => setOpen(true)}
            className="btn btn-success btn-lg w-100"
          >
            Hisoblash turini tanlang
          </button>
        </div>

        {/* Hisoblash uchun inputlar */}
        <div className="mt-4">
          {renderInputs()}
          <button
            onClick={handleCalculation}
            className="btn btn-primary btn-lg w-100 mt-3"
          >
            Hisoblash
          </button>
        </div>

        {/* Hisoblash natijalari */}
        {selectedCalculation === "savings" && months && (
          <div className="mt-4 text-center h4">{months}</div>
        )}
        {selectedCalculation === "loan" && loanPayment && (
          <div className="mt-4 text-center h4">Oylik to'lov: {loanPayment} {currency}</div>
        )}
        {selectedCalculation === "investment" && investmentResult && (
          <div className="mt-4 text-center h4">Investitsiya natijasi: {investmentResult} {currency}</div>
        )}
        {selectedCalculation === "inflation" && (
          <div className="mt-4 text-center h4">Inflatsiya ta'siri: {formatNumber(goal)} {currency}</div>
        )}
        {selectedCalculation === "annualIncome" && (
          <div className="mt-4 text-center h4">Yillik daromad: {formatNumber(annualIncome)} {currency}</div>
        )}
        {selectedCalculation === "annualExpenses" && (
          <div className="mt-4 text-center h4">Yillik xarajatlar: {formatNumber(annualExpenses)} {currency}</div>
        )}
        {selectedCalculation === "netIncome" && (
          <div className="mt-4 text-center h4">Sof daromad: {formatNumber(netIncome)} {currency}</div>
        )}

        {/* Grafik */}
        <h3 className="text-center h3 mt-5">📊 Moliyaviy Grafik</h3>
        <div className="w-100 h-48 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" tickFormatter={formatNumber} />
              <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "white" }} formatter={(value) => formatNumber(value)} />
              <Bar dataKey="value" fill="#F59E0B" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hisoblash turini tanlash uchun modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Hisoblash turini tanlang</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setOpen(false)}></button>
            </div>
            <div className="modal-body">
              <RadioGroup value={selectedCalculation} onChange={(e) => setSelectedCalculation(e.target.value)}>
                <FormControlLabel value="savings" control={<Radio />} label="Jamg'arish vaqti" />
                <FormControlLabel value="loan" control={<Radio />} label="Kredit to'lovlari" />
                <FormControlLabel value="investment" control={<Radio />} label="Investitsiya natijasi" />
                <FormControlLabel value="inflation" control={<Radio />} label="Inflyatsiyani hisobga olish" />
                <FormControlLabel value="annualIncome" control={<Radio />} label="Yillik daromad" />
                <FormControlLabel value="annualExpenses" control={<Radio />} label="Yillik xarajatlar" />
                <FormControlLabel value="netIncome" control={<Radio />} label="Sof daromad" />
              </RadioGroup>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Bekor qilish</button>
              <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>Tanlash</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}