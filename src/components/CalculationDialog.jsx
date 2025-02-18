import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Radio, RadioGroup, FormControlLabel, TextField } from "@mui/material";

export default function CalculationDialog({
    open,
    onClose,
    selectedCalculation,
    setSelectedCalculation,
    handleCalculation,
    setSalary,
    setExpenses,
    setGoal,
    setLoan,
    setLoanMonths,
    setInvestmentAmount,
    setInvestmentRate,
    setInvestmentYears,
    setInflationRate,
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Hisoblash turini tanlang</DialogTitle>
            <DialogContent>
                <RadioGroup value={selectedCalculation} onChange={(e) => setSelectedCalculation(e.target.value)}>
                    <FormControlLabel value="savings" control={<Radio />} label="Jamg'arish vaqti" />
                    <FormControlLabel value="loan" control={<Radio />} label="Kredit to'lovlari" />
                    <FormControlLabel value="investment" control={<Radio />} label="Investitsiya natijasi" />
                    <FormControlLabel value="inflation" control={<Radio />} label="Inflyatsiyani hisobga olish" />
                    <FormControlLabel value="annualIncome" control={<Radio />} label="Yillik daromad" />
                    <FormControlLabel value="annualExpenses" control={<Radio />} label="Yillik xarajatlar" />
                    <FormControlLabel value="netIncome" control={<Radio />} label="Sof daromad" />
                </RadioGroup>

                {selectedCalculation === "savings" && (
                    <>
                        <TextField label="Oylik daromad" type="number" fullWidth margin="normal" onChange={(e) => setSalary(Number(e.target.value))} />
                        <TextField label="Oylik xarajatlar" type="number" fullWidth margin="normal" onChange={(e) => setExpenses(Number(e.target.value))} />
                        <TextField label="Jamg'arma maqsadi" type="number" fullWidth margin="normal" onChange={(e) => setGoal(Number(e.target.value))} />
                    </>
                )}
                {selectedCalculation === "loan" && (
                    <>
                        <TextField label="Kredit miqdori" type="number" fullWidth margin="normal" onChange={(e) => setLoan(Number(e.target.value))} />
                        <TextField label="Kredit muddati (oy)" type="number" fullWidth margin="normal" onChange={(e) => setLoanMonths(Number(e.target.value))} />
                    </>
                )}
                {selectedCalculation === "investment" && (
                    <>
                        <TextField label="Investitsiya miqdori" type="number" fullWidth margin="normal" onChange={(e) => setInvestmentAmount(Number(e.target.value))} />
                        <TextField label="Foiz stavkasi (%)" type="number" fullWidth margin="normal" onChange={(e) => setInvestmentRate(Number(e.target.value))} />
                        <TextField label="Yillar" type="number" fullWidth margin="normal" onChange={(e) => setInvestmentYears(Number(e.target.value))} />
                    </>
                )}
                {selectedCalculation === "inflation" && (
                    <>
                        <TextField label="Maqsad miqdori" type="number" fullWidth margin="normal" onChange={(e) => setGoal(Number(e.target.value))} />
                        <TextField label="Inflatsiya stavkasi (%)" type="number" fullWidth margin="normal" onChange={(e) => setInflationRate(Number(e.target.value))} />
                    </>
                )}
                {selectedCalculation === "annualIncome" && (
                    <TextField label="Oylik daromad" type="number" fullWidth margin="normal" onChange={(e) => setSalary(Number(e.target.value))} />
                )}
                {selectedCalculation === "annualExpenses" && (
                    <TextField label="Oylik xarajatlar" type="number" fullWidth margin="normal" onChange={(e) => setExpenses(Number(e.target.value))} />
                )}
                {selectedCalculation === "netIncome" && (
                    <>
                        <TextField label="Oylik daromad" type="number" fullWidth margin="normal" onChange={(e) => setSalary(Number(e.target.value))} />
                        <TextField label="Oylik xarajatlar" type="number" fullWidth margin="normal" onChange={(e) => setExpenses(Number(e.target.value))} />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Bekor qilish</Button>
                <Button onClick={handleCalculation} color="primary">
                    Hisoblash
                </Button>
            </DialogActions>
        </Dialog>
    );
}