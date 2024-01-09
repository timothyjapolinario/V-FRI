import Calculator from "./Calculator";
import { RiskIndexInterpretationTable } from "./RiskIndexInterpretationTable";

const FloodRiskIndexCalculator = () => {
  return (
    <div>
      <h1 className="text-[#791212] font-extrabold text-4xl text-center">
        Calculator
      </h1>
      <div className="border-2 border-solid border-[#791212] m-4 p-4">
        <Calculator />
      </div>
    </div>
  );
};

export default FloodRiskIndexCalculator;
