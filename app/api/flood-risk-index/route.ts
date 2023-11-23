import { NextRequest, NextResponse } from "next/server";
import { getInterpretation } from "./floodRiskIndexInterpreter";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import firebaseApp from "@/firebase/firebaseApp";
import {
  calculateCapacity,
  calculateExposure,
  calculateHazard,
  calculateVulnerability,
} from "./floodRiskCalculator";
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const hazardValues = body["HAZARD"];
  const computedHazard = calculateHazard(hazardValues);

  const exposureValues = body["EXPOSURE"];
  const computedExposure = calculateExposure(exposureValues);

  const vulnerabilityValues = body["VULNERABILITY"];
  const computedVulnerability = calculateVulnerability(vulnerabilityValues);

  const capacityValues = body["CAPACITY"];
  const computedCapacity = calculateCapacity(capacityValues);

  const floodRiskIndex =
    (computedHazard * computedVulnerability * computedExposure) /
    computedCapacity;

  // if (!body["floodRiskIndexValue"]) {
  //   return NextResponse.json({
  //     error: true,
  //     message: "No flood risk index value",
  //   });
  // }
  // if (typeof body["floodRiskIndexValue"] === "string") {
  //   val = parseInt(body["floodRiskIndexValue"]);
  // }
  // const interpretation = getInterpretation(val);
  // try {
  //   const db = getFirestore(firebaseApp);
  //   const docRef = await addDoc(collection(db, "floodRiskIndeces"), {
  //     value: val,
  //     interpretation: interpretation,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }

  return NextResponse.json({
    hazard: computedHazard,
    exposure: computedExposure,
    vulnerability: computedVulnerability,
    capacity: computedCapacity,
    floodRiskIndex: floodRiskIndex,
  });
}

export async function GET(req: NextRequest) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "floodRiskIndeces");
  const docSnap = await getDocs(collectionRef);
  const floodRiskIndeces: any[] = [];
  docSnap.forEach((doc) => {
    floodRiskIndeces.push(doc.data());
  });

  return NextResponse.json({ data: floodRiskIndeces });
}
