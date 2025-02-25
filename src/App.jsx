import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Modal, Button, Radio, RadioGroup, FormControlLabel, Select, MenuItem, TextField } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DollarSign, ShoppingCart, PiggyBank, CreditCard, TrendingUp, Calendar, FileText, Briefcase, Banknote, BarChart2 } from "lucide-react";
import "./index.css"
export default function FinancialCalculator() {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [goal, setGoal] = useState(0);
  const [goalData, setGoalData] = useState(0);
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

  const formatNumber = (num, decimals = 2) => {
    if (typeof num !== 'number') return num;
    return num.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };
  
  const calculateMonths = () => {
    const savingsPerMonth = salary - expenses;
    if (savingsPerMonth > 0 && goal > 0) {
      const totalSeconds = (goal / savingsPerMonth) * 30 * 24 * 60 * 60; // umumiy soniyalar
      const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
      const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      // Hozirgi vaqtni olish
      const now = new Date();
      const futureDate = new Date(now.getTime() + totalSeconds * 1000);

      // Natijani chiqarish
      setMonths(`${months} oy, ${days} kun, ${hours} soat, ${minutes} minut, ${seconds} sekund`);
      setGoalData(`Tugash sanasi: ${futureDate.getDate()}/${futureDate.getMonth() + 1}/${futureDate.getFullYear()}`);
    } else {
      setMonths("Jamg‘ara olmaysiz! Harajatlarni kamaytiring.");
    }
  };



  const calculateLoan = () => {
    if (loan > 0 && loanMonths > 0) {
      const monthlyInterestRate = 0.1 / 12; // 10% yillik foizni oylik foizga aylantiramiz
      const monthlyPayment = (loan * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanMonths));
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
      setGoal(formatNumber(futureValue.toFixed(2)));
    } else {
      setGoal("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateAnnualIncome = () => {
    if (salary > 0) {
      setAnnualIncome(formatNumber((salary * 12).toFixed(2)));
    } else {
      setAnnualIncome("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateAnnualExpenses = () => {
    if (expenses > 0) {
      setAnnualExpenses(formatNumber((expenses * 12).toFixed(2)));
    } else {
      setAnnualExpenses("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  const calculateNetIncome = () => {
    if (salary > 0 && expenses > 0) {
      setNetIncome(formatNumber(((salary - expenses) * 12).toFixed(2)));
    } else {
      setNetIncome("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleCalculation = () => {
    let error = "";

    switch (selectedCalculation) {
      case "savings":
        if (salary <= 0 || expenses < 0 || goal <= 0) {
          error = "Ma'lumotlar noto‘g‘ri kiritilgan! Iltimos, to‘g‘ri qiymatlarni kiriting.";
        } else {
          calculateMonths();
        }
        break;

      case "loan":
        if (loan <= 0 || loanMonths <= 0) {
          error = "Kredit miqdori va muddatini to‘g‘ri kiriting!";
        } else {
          calculateLoan();
        }
        break;

      case "investment":
        if (investmentAmount <= 0 || investmentRate <= 0 || investmentYears <= 0) {
          error = "Investitsiya ma'lumotlarini to‘g‘ri kiriting!";
        } else {
          calculateInvestment();
        }
        break;

      case "inflation":
        if (inflationRate <= 0 || goal <= 0 || months <= 0) {
          error = "Inflyatsiya ma'lumotlarini to‘g‘ri kiriting!";
        } else {
          calculateInflation();
        }
        break;

      case "annualIncome":
        if (salary <= 0) {
          error = "Ish haqi miqdorini to‘g‘ri kiriting!";
        } else {
          calculateAnnualIncome();
        }
        break;

      case "annualExpenses":
        if (expenses <= 0) {
          error = "Xarajatlar miqdorini to‘g‘ri kiriting!";
        } else {
          calculateAnnualExpenses();
        }
        break;

      case "netIncome":
        if (salary <= 0 || expenses < 0) {
          error = "Sof daromadni hisoblash uchun ish haqi va xarajatlarni to‘g‘ri kiriting!";
        } else {
          calculateNetIncome();
        }
        break;

      default:
        error = "Hisoblash turini tanlang!";
        break;
    }

    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
    }

    setIsModalOpen(true);
  };


  const formatNumberr = (num) => {
    if (num == "") return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const renderInputs = () => {
    switch (selectedCalculation) {
      case "savings":
        return (
          <>
            <TextField
              label="Oylik daromad"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(salary)}
              onChange={(e) => setSalary(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <DollarSign className="text-green-500 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Oylik xarajatlar"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(expenses)}
              onChange={(e) => setExpenses(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <ShoppingCart className="text-red-500 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Jamg'arma maqsadi"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(goal)}
              onChange={(e) => setGoal(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <PiggyBank className="text-blue-500 mr-2" />,
                style: { color: "white" }
              }}
            />
          </>
        );
      case "loan":
        return (
          <>
            <TextField
              label="Kredit miqdori"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(loan)}
              onChange={(e) => setLoan(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Banknote className="text-gray-500 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Kredit muddati (oy)"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(loanMonths)}
              onChange={(e) => setLoanMonths(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-gray-500 mr-2" />,
                style: { color: "white" }
              }}
            />
          </>
        );
      case "investment":
        return (
          <>
            <TextField
              label="Investitsiya miqdori"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(investmentAmount)}
              onChange={(e) => setInvestmentAmount(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <TrendingUp className="text-green-600 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Foiz stavkasi (%)"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(investmentRate)}
              onChange={(e) => setInvestmentRate(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <BarChart2 className="text-yellow-500 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Yillar"
              type="text"
              fullWidth
              margin="normal"
              value={formatNumberr(investmentYears)}
              onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-green-400 mr-2" />,
                style: { color: "white" }
              }}
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
              value={formatNumberr(goal)}
              onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-green-400 mr-2" />,
                style: { color: "white" }
              }}

            />
            <TextField
              label="Inflatsiya stavkasi (%)"
              type="number"
              fullWidth
              margin="normal"
              value={formatNumberr(inflationRate)}
              onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-green-400 mr-2" />,
                style: { color: "white" }
              }}
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
            value={formatNumberr(salary)}
            onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
            className="mb-3"
            InputProps={{
              startAdornment: <Calendar className="text-green-400 mr-2" />,
              style: { color: "white" }
            }}
          />
        );
      case "annualExpenses":
        return (
          <TextField
            label="Oylik xarajatlar"
            type="number"
            fullWidth
            margin="normal"
            value={formatNumberr(expenses)}
            onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
            className="mb-3"
            InputProps={{
              startAdornment: <Calendar className="text-green-400 mr-2" />,
              style: { color: "white" }
            }}
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
              value={formatNumberr(salary)}
              onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-green-400 mr-2" />,
                style: { color: "white" }
              }}
            />
            <TextField
              label="Oylik xarajatlar"
              type="number"
              fullWidth
              margin="normal"
              value={formatNumberr(expenses)}
              onChange={(e) => setInvestmentYears(e.target.value.replace(/\D/g, ""))}
              className="mb-3"
              InputProps={{
                startAdornment: <Calendar className="text-green-400 mr-2" />,
                style: { color: "white" }
              }}
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
    <div className="w-full bg-gradient-to-br from-gray-100 p-3 via-gray-200 to-gray-300 min-h-screen flex items-center justify-center lato-thin">
      <div className="bg-gradient-to-br from-gray-800 shadow-2xl via-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl max-w-2xl w-full">

        <div className="w-full space-y-4 mb-2">
          <div className="flex items-center gap-4">
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-2 rounded-3xl shadow-lg transition-all duration-300 
             bg-gradient-to-r from-green-400 to-blue-500 text-white 
             hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ fontSize: '1rem' }}
            >
              <MenuItem
                value="UZS"
                className="text-gray-800 font-semibold hover:bg-green-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                UZS
              </MenuItem>
              <MenuItem
                value="USD"
                className="text-gray-800 font-semibold hover:bg-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                USD
              </MenuItem>
              <MenuItem
                value="EUR"
                className="text-gray-800 font-semibold hover:bg-purple-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                EUR
              </MenuItem>
            </Select>


            <button
              onClick={() => setOpen(true)}
              className="btn w-full py-3 px-2 rounded-3xl shadow-lg transition-all duration-300 
             bg-gradient-to-r from-green-400 to-blue-500  text-white w-full py-3 rounded-lg hover:bg-teal-500 transition duration-300"
              style={{ fontSize: '1rem' }}
            >
              Hisoblash turlari
            </button>
          </div>
        </div>

        {renderInputs()}
        <button
          onClick={handleCalculation}
          className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white w-full py-3 mt-4 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 transition duration-300"
          style={{ fontSize: "1.2rem" }}
        >
          Hisoblash
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Hisoblash natijalari</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white text-xl"
                >
                  x
                </button>
              </div>

              {errorMessage ? (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              ) : (
                <div className="space-y-2 text-sm">
                  {selectedCalculation === "savings" && months && goalData && (
                    <div className="flex justify-between">
                      <span>Jamg‘arma muddati:</span>
                      <span className="font-semibold">{months} {goalData}</span>
                    </div>
                  )}
                  {selectedCalculation === "loan" && loanPayment && (
                    <div className="flex justify-between">
                      <span>Oylik to'lov:</span>
                      <span className="font-semibold">{loanPayment} {currency}</span>
                    </div>
                  )}
                  {selectedCalculation === "investment" && investmentResult && (
                    <div className="flex justify-between">
                      <span>Investitsiya natijasi:</span>
                      <span className="font-semibold">{investmentResult} {currency}</span>
                    </div>
                  )}
                  {selectedCalculation === "inflation" && (
                    <div className="flex justify-between">
                      <span>Inflyatsiya ta'siri:</span>
                      <span className="font-semibold">{formatNumber(goal)} {currency}</span>
                    </div>
                  )}
                  {selectedCalculation === "annualIncome" && (
                    <div className="flex justify-between">
                      <span>Yillik daromad:</span>
                      <span className="font-semibold">{formatNumber(annualIncome)} {currency}</span>
                    </div>
                  )}
                  {selectedCalculation === "annualExpenses" && (
                    <div className="flex justify-between">
                      <span>Yillik xarajatlar:</span>
                      <span className="font-semibold">{formatNumber(annualExpenses)} {currency}</span>
                    </div>
                  )}
                  {selectedCalculation === "netIncome" && (
                    <div className="flex justify-between">
                      <span>Sof daromad:</span>
                      <span className="font-semibold">{formatNumber(netIncome)} {currency}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}


        {/* Grafik */}
        <h3 className="text-center text-2xl text-white mt-6">
          📊 Moliyaviy Grafik
        </h3>
        <div className="mt-4 w-full h-48 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <defs>
                {/* Default gradient (green to blue) */}
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34D399" /> {/* Green-400 */}
                  <stop offset="100%" stopColor="#3B82F6" /> {/* Blue-500 */}
                </linearGradient>

                {/* Hover qilinganda (gray color) */}
                <linearGradient id="barHoverGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9CA3AF" /> {/* Gray-400 */}
                  <stop offset="100%" stopColor="#6B7280" /> {/* Gray-500 */}
                </linearGradient>
              </defs>

              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" tickFormatter={formatNumber} />
              <Tooltip
                wrapperStyle={{ backgroundColor: "#333", color: "black" }}
                formatter={(value) => formatNumber(value)}
              />

              {/* Ustunlar hover bilan */}
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                barSize={35}
                onMouseOver={(e) => (e.target.style.fill = "url(#barHoverGradient)")}
                onMouseOut={(e) => (e.target.style.fill = "url(#barGradient)")}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl max-w-md w-full">
            <h5 className="text-2xl font-semibold mb-4 text-center">Hisoblash turini tanlang</h5>
            <RadioGroup value={selectedCalculation} onChange={(e) => setSelectedCalculation(e.target.value)}>
              <FormControlLabel
                value="savings"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><PiggyBank className="text-yellow-400" /> Jamg'arish vaqti</div>}
              />
              <FormControlLabel
                value="loan"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><CreditCard className="text-gray-400" /> Kredit to'lovlari</div>}
              />
              <FormControlLabel
                value="investment"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><TrendingUp className="text-green-600" /> Investitsiya natijasi</div>}
              />
              <FormControlLabel
                value="inflation"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><BarChart2 className="text-yellow-500" /> Inflyatsiya ta'siri</div>}
              />
              <FormControlLabel
                value="annualIncome"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><Calendar className="text-green-400" /> Yillik daromad</div>}
              />
              <FormControlLabel
                value="annualExpenses"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><FileText className="text-red-400" /> Yillik xarajatlar</div>}
              />
              <FormControlLabel
                value="netIncome"
                control={<Radio />}
                label={<div className="flex items-center gap-2 text-xl"><Briefcase className="text-blue-600" /> Sof daromad</div>}
              />
            </RadioGroup>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => setOpen(false)}
                className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md"
              >
                Tanlash
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>

  );
}