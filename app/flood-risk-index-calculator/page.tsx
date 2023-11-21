import Calculator from "./Calculator";
import { RiskIndexInterpretationTable } from "./RiskIndexInterpretationTable";

const FloodRiskIndexCalculator = () => {
  return (
    <div>
      <h1>Calculator</h1>
      <div className="border-2 border-solid border-black m-4 p-4">
        <Calculator />
      </div>
      {/* <div className="m-4 p-4">
        <RiskIndexInterpretationTable />
      </div> */}
    </div>
  );
};

export default FloodRiskIndexCalculator;
