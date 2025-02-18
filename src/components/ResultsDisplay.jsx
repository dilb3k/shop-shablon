export default function ResultsDisplay({
    selectedCalculation,
    months,
    loanPayment,
    investmentResult,
    goal,
    annualIncome,
    annualExpenses,
    netIncome,
    currency,
    formatNumber,
}) {
    return (
        <div className="mt-4">
            {selectedCalculation === "savings" && months && (
                <div className="text-center text-lg font-semibold text-gray-300">{months}</div>
            )}
            {selectedCalculation === "loan" && loanPayment && (
                <div className="text-center text-lg font-semibold text-gray-300">Oylik to'lov: {loanPayment} {currency}</div>
            )}
            {selectedCalculation === "investment" && investmentResult && (
                <div className="text-center text-lg font-semibold text-gray-300">Investitsiya natijasi: {investmentResult} {currency}</div>
            )}
            {selectedCalculation === "inflation" && (
                <div className="text-center text-lg font-semibold text-gray-300">Inflatsiya ta'siri: {formatNumber(goal)} {currency}</div>
            )}
            {selectedCalculation === "annualIncome" && (
                <div className="text-center text-lg font-semibold text-gray-300">Yillik daromad: {formatNumber(annualIncome)} {currency}</div>
            )}
            {selectedCalculation === "annualExpenses" && (
                <div className="text-center text-lg font-semibold text-gray-300">Yillik xarajatlar: {formatNumber(annualExpenses)} {currency}</div>
            )}
            {selectedCalculation === "netIncome" && (
                <div className="text-center text-lg font-semibold text-gray-300">Sof daromad: {formatNumber(netIncome)} {currency}</div>
            )}
        </div>
    );
}